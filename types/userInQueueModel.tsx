import { unitModel } from "./unitModel";

export interface userInQueueModel {
  createdAt: Date;
  elo: number;
  socketId: string;
  unitsInQueue: unitModel[];
  updatedAt: Date;
  userId: string;
  _id: string;
}
