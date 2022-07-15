import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema(
  {
    id: { type: String },
    type: { type: String },
    name: { type: String },
    description: { type: String },
    image: { type: String },
    group: { type: String },
    levels: [],
  },
  { timestamps: true }
);

export default mongoose.model("Building", BuildingSchema);
