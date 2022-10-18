import { NextApiRequest, NextApiResponse } from "next";
import {
  createVillage,
  getVillageById,
} from "../../../../utils/villageFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        let { id } = req.query;

        if (!id) {
          return res.status(500).send("Missing id");
        }

        try {
          const response = await getVillageById(id.toString());

          if (response.status !== 200) {
            res.status(response.status).send(response.msg);
          }

          res.status(response.status).json(response.villageResponse);
        } catch (error) {
          res.status(500).send({ error: "failed to fetch data" });

          throw new Error("Internal Server Error");
        }
      }
      break;

    case "POST":
      {
        const { id } = req.query;

        if (!id) {
          return res.status(500).send("Missing id");
        }

        try {
          const response = await createVillage(id.toString());

          if (response.status === 201) {
            res.status(response.status).json(response.village);
          } else {
            res.status(response.status).json(response.msg);
          }
        } catch (e: any) {
          res.status(500).send({ error: "failed to fetch data" });

          throw new Error("Internal Server Error");
        }
      }
      break;
  }
}
