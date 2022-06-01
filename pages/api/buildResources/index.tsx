// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb, firebaseAdmin } from "../../../firebase/serverApp";
import { getServerTime, updateResourcesToDate } from "../gameFunctions";
import { getBuildingById } from "../gsBuildings/[id]";
import { getVillageById } from "../village/[id]";
const schedule = require("node-schedule");
var dayjs = require("dayjs");

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
            const fieldId = req.body.fieldId;
            const isBuilding = req.body.isBuilding;
            const cancleJob = req.body.cancleJob;

            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_NODEJS_APP}/build`,
              { villageId, buildingName, fieldId, isBuilding, cancleJob },
              { headers: { Authorization: `Bearer ${jwtToken}` } }
            );

            console.log("response", response.status);
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
