// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type {NextApiRequest, NextApiResponse} from "next";
import {firebaseAdmin} from "../../../firebase/serverApp";
import {getBuildingById} from "../gsBuildings/[id]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST": {
      {
        try {
          if (!req.headers.authorization)
            return res.status(400).send("Token error!");

          const jwtToken = req.headers.authorization.split(" ")[1];

          const token = await firebaseAdmin.auth().verifyIdToken(jwtToken);

          if (token) {
            const villageId = req.body.villageId;
            const buildingName = req.body.buildingName;
            const unitName = req.body.unitName;
            const unitAmount = req.body.unitAmount;

            const response = await getBuildingById(buildingName);
            console.log(response);

            res.status(200).json(response);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
