import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
import {NextApiRequest, NextApiResponse} from "next";
import {adminDb, firebaseAdmin} from "../../../../firebase/serverApp";
dayjs.extend(duration);

async function getServerTime() {
  return firebaseAdmin.firestore.Timestamp.now().toDate();
}

async function getBuildingById(buildingId) {
  let buildingArray = [];
  const building = adminDb.collection("gsBuildings").doc(buildingId);
  const doc = await building.get();

  if (!doc.exists) {
    throw new Error("Building not found!");
  } else {
    buildingArray.push(doc.data());
    return buildingArray;
  }
}

async function updateResourcesToDate(villageObject, villageId) {
  const serverTime = await getServerTime();
  const lastVillageUpdateTime = villageObject.updatedAt.toDate();
  const villageWoodProduction = villageObject.woodProductionPerH;
  const villageClayProduction = villageObject.clayProductionPerH;
  const villageIronProduction = villageObject.ironProductionPerH;
  const villageWheatProduction = villageObject.wheatProductionPerH;

  const findWarehouseInVillage = villageObject.villageBuildings.find(
    (building) => building.type === "warehouse"
  );

  const findGranaryInVillage = villageObject.villageBuildings.find(
    (building) => building.type === "granary"
  );

  const warehouseAllLevels = await getBuildingById("warehouse");
  const granaryAllLevels = await getBuildingById("warehouse");

  const warehouseMaxResourcesForCurrentLevel = findWarehouseInVillage
    ? warehouseAllLevels[0].levels[0][`${findWarehouseInVillage.level}`]
        .warehouseResourceLimit
    : 800;

  const granaryMaxResourcesForCurrentLevel = findGranaryInVillage
    ? granaryAllLevels[0].levels[0][`${findGranaryInVillage.level}`]
        .warehouseResourceLimit
    : 800;

  const date1 = dayjs(serverTime);
  const date2 = dayjs(lastVillageUpdateTime);
  const diffInMS = date1.diff(date2);

  console.log("diffInMS", diffInMS);

  const diffInH = dayjs.duration(diffInMS).asHours();

  const woodCalculation =
    villageObject.resourcesStorage.woodAmount + villageWoodProduction * diffInH;
  const clayCalculation =
    villageObject.resourcesStorage.clayAmount + villageClayProduction * diffInH;
  const ironCalculation =
    villageObject.resourcesStorage.ironAmount + villageIronProduction * diffInH;
  const wheatCalculation =
    villageObject.resourcesStorage.wheatAmount +
    villageWheatProduction * diffInH;

  const updateStorageWith = {
    woodAmount:
      woodCalculation > warehouseMaxResourcesForCurrentLevel
        ? warehouseMaxResourcesForCurrentLevel
        : woodCalculation,
    clayAmount:
      clayCalculation > warehouseMaxResourcesForCurrentLevel
        ? warehouseMaxResourcesForCurrentLevel
        : clayCalculation,
    ironAmount:
      ironCalculation > warehouseMaxResourcesForCurrentLevel
        ? warehouseMaxResourcesForCurrentLevel
        : ironCalculation,
    wheatAmount:
      wheatCalculation > granaryMaxResourcesForCurrentLevel
        ? granaryMaxResourcesForCurrentLevel
        : wheatCalculation,
  };

  const docRef = adminDb.collection("village").doc(villageId);
  const response = await docRef
    .update({
      resourcesStorage: updateStorageWith,
      updatedAt: serverTime,
    })
    .then(() => docRef.get())
    .then((doc) => doc.data());

  console.log("Updated resources and current date/time field!");

  return response;
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        let {id} = req.query;
        if (!id) {
          res.status(404).send("No id!");
        }

        try {
          if (!req.headers.authorization)
            return res.status(400).send("Token error!");

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

            return res.status(200).send(response);
          }
        } catch (error) {
          console.log("error", error);
        }
      }

      break;
  }
}
