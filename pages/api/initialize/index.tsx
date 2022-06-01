import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../firebase/serverApp";
import { getAllBuildings } from "../gsBuildings";
import { getAllUnits } from "../gsUnits";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          if (!req.headers.authorization)
            return res.status(400).send("Token error!");

          const jwtToken = req.headers.authorization.split(" ")[1];

          const token = await firebaseAdmin.auth().verifyIdToken(jwtToken);

          if (token) {
            const buildingsResponse = await getAllBuildings();
            const unitsResponse = await getAllUnits();

            res.status(200).json({ buildingsResponse, unitsResponse });
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
