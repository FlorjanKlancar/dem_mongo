import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema(
  {
    id: { type: String },
    userId: { type: String },
    unitsInQueue: [
      {
        level: { type: Number },
        amount: { type: Number },
        name: { type: String },
      },
    ],
    elo: { type: Number },
    socketId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Queue", QueueSchema);
