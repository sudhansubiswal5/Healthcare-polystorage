import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMySQL } from "./config/db.js";
import { connectMongoDB } from "./config/mongo.js";
import authRoutes from "./routes/authRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Core Stable Routes
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);

const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Safe Server running on port ${PORT}`);
    
    // Background connections so the app doesn't hang
    connectMySQL().then(() => console.log("✅ MySQL Connected"));
    connectMongoDB().then(() => console.log("✅ MongoDB Connected"));
});