import mongoose from "mongoose";

const BattleSchema = new mongoose.Schema(
  {
    id: {type: String},
    playerOne: {type: String},
    playerTwo: {type: String},
    unitsPlayerOne: [
      {
        level: {type: Number},
        amount: {type: Number},
        name: {type: String},
      },
    ],
    unitsPlayerTwo: [
      {
        level: {type: Number},
        amount: {type: Number},
        name: {type: String},
      },
    ],
    eloPlayerOne: {type: Number},
    eloPlayerTwo: {type: Number},
    winner: {type: String},
    playerOneSocketId: {type: String},
    playerTwoSocketId: {type: String},
    newReport: {type: Boolean},
  },
  {timestamps: true}
);

export default mongoose.model("Battle", BattleSchema);
