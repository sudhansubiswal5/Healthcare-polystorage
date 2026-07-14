import Appointment from "../models/Appointment.js";
import Bed from "../models/Bed.js";

// 1. Fetch all beds
export const getAllBeds = async (req, res) => {
  try {
    const beds = await Bed.find();
    res.json(beds);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// 2. The core booking logic (Linked to both MySQL and MongoDB)
export const bookBed = async (req, res) => {
  try {
    const { bedId, doctorName, date, time, reason } = req.body;

    // Flexible lookup for Bed ID or Number
    const bed = await Bed.findOneAndUpdate(
      { $or: [
        { _id: bedId.length === 24 ? bedId : null }, 
        { bedNumber: bedId }, 
        { bedNum: bedId }
      ]},
      { status: "occupied" },
      { new: true }
    );

    if (!bed) return res.status(404).json({ message: "Bed not found" });

    const appt = new Appointment({ 
      userId: req.user.id, // From MySQL
      bedId: bed._id,      // From MongoDB
      doctorName, date, time, reason 
    });

    await appt.save();
    res.status(201).json({ message: "Booked!" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// ✅ ADDED/FIXED: Explicit export for createAppointment
export const createAppointment = async (req, res) => {
  try {
    const appt = new Appointment({ ...req.body, userId: req.user.id });
    await appt.save();
    res.status(201).json(appt);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

// 3. Fetch history
export const getAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ userId: req.user.id });
    res.json(appts);
  } catch (error) { res.status(500).json({ error: error.message }); }
};