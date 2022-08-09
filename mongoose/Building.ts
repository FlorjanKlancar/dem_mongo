import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema(
  {
    id: {type: String},
    type: {type: String},
    name: {type: String},
    description: {type: String},
    image: {type: String},
    group: {type: String},
    levels: [],
  },
  {timestamps: true}
);

// prettier-ignore
export default mongoose?.models?.Building || mongoose.model("Building", BuildingSchema);
