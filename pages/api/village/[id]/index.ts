import { NextApiRequest, NextApiResponse } from "next";
import { adminDb, firebaseAdmin } from "../../../../firebase/serverApp";
import { getBuildingById } from "../../gsBuildings/[id]";
import { getVillageById, updateResourcesToDate } from "../../gameFunctions";
import { createUnits } from "../../../../utils/createUnits";
import { newVillage } from "../../../../utils/VillageDummyData";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { connectToDatabase } from "../../../../utils/mongodb";
import { ObjectId } from "mongodb";
import mongoose, { Types } from "mongoose";

const secret = process.env.JWT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  switch (req.method) {
    default:
    case "GET":
      {
        let { id } = req.query;
        if (!id) {
          res.status(404).send("No id!");
        }

        try {
          console.log(id);
          let o_id = new ObjectId(id.toString()); // id as a string is passed

          const village = await db
            .collection("villages")
            .find({
              userId: new Types.ObjectId(id.toString()),
            })
            .toArray();

          console.log("village", village);
          return res.status(200).json(village);
        } catch (error) {
          console.log("error", error);
        }
      }

      break;

    case "POST":
      {
        const { id } = req.query;

        const response = await axios.post("http://localhost:5000/api/village", {
          userId: id,
        });

        console.log("response", response);

        if (response.status === 200) {
          res.status(200).send(response.data);
        } else {
          res.status(400).send("Error");
        }
      }
      break;
  }
}
