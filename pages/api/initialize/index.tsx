import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";
import {getAllBuildings} from "../../../utils/gsBuildingsFunctions";
import {getAllUnits} from "../../../utils/gsUnitsFunctions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          const gsBuildings = await getAllBuildings();
          const gsUnits = await getAllUnits();

          res.status(200).json({
            buildingsResponse: gsBuildings,
            unitsResponse: gsUnits,
          });
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
