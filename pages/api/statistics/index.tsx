import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";
import {getAllStatistics} from "../../../utils/statisticsFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          const statistics = await getAllStatistics();

          res.status(200).json(statistics);
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
