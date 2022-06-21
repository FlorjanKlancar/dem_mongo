import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../firebase/serverApp";
import { connectToDatabase } from "../../../utils/mongodb";
import { getAllBuildings } from "../gsBuildings";
import { getAllUnits } from "../gsUnits";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          const buildingsResponse = await db.collection("buildings").find({});
          const unitsResponse = await db.collection("units").find({});

          res.status(200).json({ buildingsResponse, unitsResponse });
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
