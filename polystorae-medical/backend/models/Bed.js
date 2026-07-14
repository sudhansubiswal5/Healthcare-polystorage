import mongoose from "mongoose";

const bedSchema = new mongoose.Schema(
  {
    // We accept both common names so you don't have to rename Atlas fields
    bedNumber: { type: String },
    bedNum: { type: String },
    type: { type: String, default: "general" },
    status: { type: String, default: "available" },
  },
  { 
    timestamps: true, 
    strict: false // ✅ CRITICAL: This stops Mongoose from crashing on "unexpected" data
  }
);

export default mongoose.model("Bed", bedSchema);