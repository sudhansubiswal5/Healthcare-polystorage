import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: Number, required: true }, // The MySQL ID link
  doctorName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);