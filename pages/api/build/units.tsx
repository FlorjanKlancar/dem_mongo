// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type {NextApiRequest, NextApiResponse} from "next";

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
          const troops = req.body.troops;

          let errorResponse = "";
          let successResponse = "";

          for (const troop of troops) {
            if (troop.unitAmount > 0) {
              const response = await axios.post(
                `${process.env.NODE_JS_URI}/build/units`,

                {
                  villageId,
                  buildingName,
                  unitId: troop.unitName,
                  unitAmount: troop.unitAmount,
                }
              );
              if (response.status !== 200) {
                errorResponse = response.villageResponse;
              } else {
                successResponse = response.villageResponse;
              }
            }
          }

          if (errorResponse.length) {
            res.status(400).send(errorResponse);
          } else {
            res.status(200).json(successResponse);
          }
        } catch (error: any) {
          res.status(400).json(error.response.data);
        }
      }
      break;
    }
  }
}
