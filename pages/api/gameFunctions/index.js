import dayjs from "dayjs";

import { adminDb, firebaseAdmin } from "../../../firebase/serverApp";
import { getBuildingById } from "../gsBuildings/[id]";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

async function getServerTime() {
  return firebaseAdmin.firestore.Timestamp.now().toDate();
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

export { getServerTime, updateResourcesToDate };
