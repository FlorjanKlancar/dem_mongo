import type { NextApiRequest, NextApiResponse } from "next";
import { upgradeBuilding } from "../../../utils/buildFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST": {
      {
        try {
          const villageId = req.body.villageId;
          const buildingName = req.body.buildingName;
          const fieldId = req.body.fieldId;
          const isBuilding = req.body.isBuilding;
          const cancleJob = req.body.cancleJob;
          const forceFinishJob = req.body.forceFinishJob;

          if (!villageId || !buildingName || !fieldId) {
            return res.status(400).send("Parameters are missing!");
          }

          const resp = await upgradeBuilding(
            villageId,
            buildingName,
            fieldId,
            isBuilding,
            cancleJob,
            forceFinishJob
          );

          return res.status(200).json(resp);
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
