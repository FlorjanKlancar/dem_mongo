import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getBattlesForUser } from "../../../../utils/battlesFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:

    case "GET":
      {
        const { userId } = req.query;

        if (!userId) {
          return res.status(400).send("Missing userId");
        }

        const { battles, newReports } = await getBattlesForUser(
          userId.toString()
        );

        res.status(200).json({ battles, newReports });
      }
      break;
  }
}
