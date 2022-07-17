import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          const response: any = await axios.get(
            `${process.env.NODE_JS_URI}/statistics`
          );

          res.status(200).json(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
