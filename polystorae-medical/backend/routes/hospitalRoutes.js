import express from "express";
import { 
  getAllBeds, 
  createAppointment, 
  getAppointments, 
  bookBed 
} from "../controllers/hospitalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to see beds
router.get("/beds", getAllBeds);

// Protected routes (require MySQL login token)
router.get("/appointments", protect, getAppointments);
router.post("/appointments", protect, createAppointment);
router.post("/book-bed", protect, bookBed);

export default router;