// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

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

          for (const troop of troops) {
            if (troop.unitAmount > 0) {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_NODEJS_APP}/build/units`,

                {
                  villageId,
                  buildingName,
                  unitName: troop.unitName,
                  unitAmount: troop.unitAmount,
                }
              );
              if (response.status !== 200) {
                errorResponse = response.data;
              }
            }
          }

          if (errorResponse.length) {
            res.status(400).send(errorResponse);
          } else {
            res.status(200).send("Unit build request sent successfully!");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
