import { NextApiRequest, NextApiResponse } from "next";
import { adminDb, firebaseAdmin } from "../../../../firebase/serverApp";
import { getBuildingById } from "../../gsBuildings/[id]";
import { updateResourcesToDate } from "../../gameFunctions";

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
  }
}

export { getVillageById };
