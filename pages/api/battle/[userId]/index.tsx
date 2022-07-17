import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:

    case "GET":
      {
        const {userId} = req.query;

        if (userId) {
          const response: any = await axios.get(
            `${process.env.NODE_JS_URI}/battle/user/${userId}`
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
