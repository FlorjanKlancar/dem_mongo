import axios from "axios";
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
          const buildingsResponse = await axios.get(
            `${process.env.NODE_JS_URI}/gsBuildings`
          );

          const unitsResponse = await axios.get(
            `${process.env.NODE_JS_URI}/gsUnits`
          );

          res.status(200).json({
            buildingsResponse: buildingsResponse.data,
            unitsResponse: unitsResponse.data,
          });
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
