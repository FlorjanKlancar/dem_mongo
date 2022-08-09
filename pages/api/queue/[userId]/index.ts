import { NextApiRequest, NextApiResponse } from "next";
import { checkIfUserIsInQueue } from "../../../../utils/queueFunctions";

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

        const userInQ = await checkIfUserIsInQueue(userId.toString());

        return res.status(200).json(userInQ);
      }
      break;
  }
}
