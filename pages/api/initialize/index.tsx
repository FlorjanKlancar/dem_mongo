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
          const buildingsResponse: any = await axios.get(
            `${process.env.NODE_JS_URI}/gsBuildings`
          );

          const unitsResponse: any = await axios.get(
            `${process.env.NODE_JS_URI}/gsUnits`
          );

          res.status(200).json({
            buildingsResponse: buildingsResponse.data,
            unitsResponse: unitsResponse.data,
          });
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
