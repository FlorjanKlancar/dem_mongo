import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:

    case "PUT":
      {
        const { userId } = req.query;
        const { heroIcon, displayName } = req.body;

        if (userId) {
          const response = await axios.put(
            `${process.env.NODE_JS_URI}/user/${userId}`,
            {
              heroIcon,
              displayName,
            }
          );

          if (response.status === 200) {
            res.status(200).send(response.data);
          } else {
            res.status(400).send("Error");
          }
        } else res.status(400).send("Parameters missing");
      }
      break;

    case "GET":
      {
        const { userId } = req.query;

        if (userId) {
          const response = await axios.get(
            `${process.env.NODE_JS_URI}/user/${userId}`
          );

          if (response.status === 200) {
            res.status(200).send(response.data);
          } else {
            res.status(400).send("Error");
          }
        } else res.status(400).send("Parameters missing");
      }
      break;
  }
}
