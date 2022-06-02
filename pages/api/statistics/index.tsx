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
          let statisticArray: any = [];
          const villages = await adminDb
            .collection("village")
            .orderBy("population", "desc")
            .limit(10)
            .get();

          if (villages.docs) {
            for await (const village of villages.docs) {
              const user = await getUserFromUid(village.id);

              if (user) {
                statisticArray.push({
                  id: village.id,
                  username: user.username || "No username defined",
                  population: village.data().population,
                  elo: user.elo,
                });
              }
            }

            if (statisticArray.length) {
              return res.status(200).send(statisticArray);
            } else {
              return res.status(400).send("No players found!");
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }
      break;
    }
  }
}
