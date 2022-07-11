export interface battleReportModel {
  _id: string;
  playerOne: string;
  playerTwo: string;
  unitsPlayerOne: any;
  unitsPlayerTwo: any;
  eloPlayerOne: number;
  eloPlayerTwo: number;
  winner: string;
  playerOneSocketId: string;
  playerTwoSocketId: string;
  newReport: boolean;
  createdAt: Date;
  updatedAt: Date;
}
