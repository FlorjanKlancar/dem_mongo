import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebase/serverApp";

async function getUserFromUid(uid: string) {
  const user = adminDb.collection("userInfo").doc(uid);
  const doc = await user.get();
  if (!doc.exists) {
    return;
  } else {
    return doc.data();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET": {
      {
        try {
          let rankingArray: any = [];
          const rankings = await adminDb
            .collection("gsRanking")

            .get();

          if (rankings.docs) {
            for await (const rank of rankings.docs) {
              rankingArray.push(rank.data());
            }
          }

          if (rankingArray.length) {
            return res.status(200).send(rankingArray);
          } else {
            return res.status(400).send("No ranks found!");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
