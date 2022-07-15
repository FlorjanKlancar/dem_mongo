import mongoose from "mongoose";

const RankSchema = new mongoose.Schema(
  {
    id: {type: String},
    rank: {type: String},
    upToElo: {type: Number},
    upkeepLimit: {type: Number},
    rankIcon: {type: String},
  },
  {timestamps: true}
);

export default mongoose.model("Rank", RankSchema);
