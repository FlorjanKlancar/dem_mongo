// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {firebaseAdmin} from "../../../firebase/serverApp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "POST": {
      try {
        if (!req.headers.authorization)
          return res.status(400).send("Token error!");

        const jwtToken = req.headers.authorization.split(" ")[1];

        const token = await firebaseAdmin.auth().verifyIdToken(jwtToken);

        const {uid, email} = token;

        res.status(200).json({uid, email});
      } catch (error) {
        console.log("error", error);
      }
      break;
    }
  }
}
