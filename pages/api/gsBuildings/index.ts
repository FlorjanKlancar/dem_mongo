// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {adminDb, firebaseAdmin} from "../../../firebase/serverApp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST": {
      {
      }
      break;
    }
    case "GET": {
      try {
        if (!req.headers.authorization)
          return res.status(400).send("Token error!");

        const jwtToken = req.headers.authorization.split(" ")[1];

        const token = await firebaseAdmin.auth().verifyIdToken(jwtToken);

        if (token) {
          let allBuildings = {};
          const buildings = await adminDb.collection("gsBuildings").get();
          if (!buildings.docs.length) {
            throw new Error("Building not found!");
          }
          buildings.docs.forEach(
            (building) =>
              (allBuildings = {...allBuildings, [building.id]: building.data()})
          );
          return res.status(200).json(allBuildings);
        }
      } catch (error) {
        console.log("error", error);
      }
      break;
    }
  }
}
