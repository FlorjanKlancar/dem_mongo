import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import Village from "../mongoose/Village";
import { buildingModel, currentlyBuildingModel } from "../types/buildingModel";
import { villageModel } from "../types/villageModel";
import { getBuildingById } from "./gsBuildingsFunctions";

dayjs.extend(duration);

const updateVillageObject = async (
  building: currentlyBuildingModel,
  villageObject: villageModel
) => {
  const getBuildingNextLevel: buildingModel = await getBuildingById(
    building.buildingId
  );

  let updatedObjectTemp: any = [];

  const iteration = building.isBuilding
    ? villageObject.villageBuildings
    : villageObject.resourceFields;

  updatedObjectTemp = iteration.map((item: any) => {
    if (item.id === building.fieldId) {
      return {
        gridPosition: item.gridPosition,
        description: item.description,
        id: item.id,
        type: getBuildingNextLevel.type,
        level: building.currentlyBuildingLevel,
        imageGrid:
          getBuildingNextLevel.levels[0][building.currentlyBuildingLevel]
            .image ?? item.imageGrid,

        ...(getBuildingNextLevel.description && {
          description: getBuildingNextLevel.description,
        }),
      };
    } else {
      return item;
    }
  });

  const update = {
    ...(building.isBuilding
      ? { villageBuildings: updatedObjectTemp }
      : { resourceFields: updatedObjectTemp }),
  };

  const village = await Village.findOneAndUpdate(
    {
      userId: villageObject.userId.toString(),
    },
    update
  );

  return village;
};

const checkForBuildingUpdate = async (village: villageModel) => {
  const serverTime = dayjs().toDate();

  const mappedBuildQueue = await Promise.all(
    village.currentlyBuilding
      .map(async (building: currentlyBuildingModel) => {
        console.log("servertime", serverTime);
        if (building.endBuildTime < serverTime) {
          await updateVillageObject(building, village);

          return;
        } else {
          console.log("still building", serverTime);
          return building;
        }
      })
      .filter((item: any) => item !== undefined)
  );

  return mappedBuildQueue.includes(undefined) ? [] : mappedBuildQueue;
};

async function updateVillageToDate(userId: string) {
  const serverTime = dayjs().toDate();

  const villageObject = await Village.findOne({ userId: userId });

  const lastVillageUpdateTime = villageObject.updatedAt;
  const villageWoodProduction = villageObject.woodProductionPerH;
  const villageClayProduction = villageObject.clayProductionPerH;
  const villageIronProduction = villageObject.ironProductionPerH;
  const villageWheatProduction = villageObject.wheatProductionPerH;

  const findWarehouseInVillage: any = villageObject.villageBuildings.find(
    (building: buildingModel) => building.type === "warehouse"
  );

  const findGranaryInVillage: any = villageObject.villageBuildings.find(
    (building: buildingModel) => building.type === "granary"
  );

  const warehouseAllLevels: any = await getBuildingById("warehouse");
  const granaryAllLevels: any = await getBuildingById("granary");

  const warehouseMaxResourcesForCurrentLevel = findWarehouseInVillage
    ? warehouseAllLevels.levels[0][`${findWarehouseInVillage.level}`]
        .warehouseResourceLimit
    : 800;

  const granaryMaxResourcesForCurrentLevel = findGranaryInVillage
    ? granaryAllLevels.levels[0][`${findGranaryInVillage.level}`]
        .granaryResourceLimit
    : 800;

  const date1 = dayjs(serverTime);
  const date2 = dayjs(lastVillageUpdateTime);
  const diffInMS = date1.diff(date2);

  const diffInH = dayjs.duration(diffInMS).asHours();

  const woodCalculation =
    villageObject.resourcesStorage.woodAmount +
    +villageWoodProduction * diffInH;
  const clayCalculation =
    villageObject.resourcesStorage.clayAmount +
    +villageClayProduction * diffInH;
  const ironCalculation =
    villageObject.resourcesStorage.ironAmount +
    +villageIronProduction * diffInH;
  const wheatCalculation =
    villageObject.resourcesStorage.wheatAmount +
    +villageWheatProduction * diffInH;

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

  let currentlyBuildingResponse: any = [];

  villageObject.resourcesStorage = updateStorageWith;
  if (villageObject.currentlyBuilding.length) {
    currentlyBuildingResponse = await checkForBuildingUpdate(villageObject);

    villageObject.currentlyBuilding = currentlyBuildingResponse;
  }

  await villageObject.save();

  return { updateStorageWith };
}

export { updateVillageToDate };
