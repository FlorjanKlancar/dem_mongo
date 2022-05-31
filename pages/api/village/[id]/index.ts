import { NextApiRequest, NextApiResponse } from "next";
import { adminDb, firebaseAdmin } from "../../../../firebase/serverApp";
import { getBuildingById } from "../../gsBuildings/[id]";
import { updateResourcesToDate } from "../../gameFunctions";
import { createUnits } from "../../../../utils/createUnits";
import { newVillage } from "../../../../utils/VillageDummyData";

const getVillageById = async (id: string) => {
  let villageArray = [];
  const village = adminDb.collection("village").doc(id.toString());
  const doc = await village.get();

  if (!doc.exists) {
    throw new Error("Village not found!");
  } else {
    villageArray.push(doc.data());

    const response = await updateResourcesToDate(
      villageArray[0],
      id.toString()
    );

    return response;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    default:
    case "GET":
      {
        let { id } = req.query;
        if (!id) {
          res.status(404).send("No id!");
        }

        try {
          if (!req.headers.authorization)
            return res.status(400).send("Token error!");

          const response = getVillageById(id.toString());

          return res.status(200).send(response);
        } catch (error) {
          console.log("error", error);
        }
      }

      break;

    case "POST":
      {
        let { id } = req.query;

        const allUnits = createUnits;

        let unitsArray: any = [];

        allUnits.forEach(async (item: any) => {
          for (const key in item) {
            if (item[key].unitName) {
              unitsArray.push({ name: key, amount: 0, level: 0 });
            }
          }
        });

        if (!id) {
          return res.status(400).send("Missing userId!");
        }

        let villageDocRef = adminDb.collection("village").doc(id.toString());
        const villageResponse = await villageDocRef
          .set({
            ...newVillage,
            units: unitsArray,
            createdAt: firebaseAdmin.firestore.Timestamp.now(),
            updatedAt: firebaseAdmin.firestore.Timestamp.now(),
          })
          .then(() => villageDocRef.get())
          .then((doc) => doc.data());

        if (!req.body.userEmail) {
          return res.status(400).send("Missing userEmail!");
        }

        let userDocRef = adminDb.collection("userInfo").doc(id.toString());
        const userResponse = await userDocRef
          .set({
            username: "",
            email: req.body.userEmail,
            elo: 100,
            createdAt: firebaseAdmin.firestore.Timestamp.now(),
            updatedAt: firebaseAdmin.firestore.Timestamp.now(),
          })
          .then(() => userDocRef.get())
          .then((doc) => doc.data());

        let battleDocRef = adminDb.collection("battles").doc(req.body.userId);
        await battleDocRef.set({
          currentOpponent: "",
          createdAt: firebaseAdmin.firestore.Timestamp.now(),
          updatedAt: firebaseAdmin.firestore.Timestamp.now(),
        });

        return res
          .status(201)
          .json({ village: villageResponse, user: userResponse });
      }

      break;
  }
}

export { getVillageById };
