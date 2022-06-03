// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseAdmin } from "../../../firebase/serverApp";

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

            console.log(villageId, buildingName, unitName, unitAmount);

            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_NODEJS_APP}/build/units`,

              { villageId, buildingName, unitName, unitAmount },
              { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            if (response.status === 200) {
              res.status(200).send(response.data.msg);
            } else {
              res.status(400).send(response.data.msg);
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
