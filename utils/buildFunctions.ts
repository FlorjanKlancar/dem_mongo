import dayjs from "dayjs";
import Village from "../mongoose/Village";
import { buildingModel } from "../types/buildingModel";
import { getBuildingById } from "./gsBuildingsFunctions";
import { updateVillageToDate } from "./utilFunctions";
import { getVillageById } from "./villageFunctions";

const upgradeBuilding = async (
  villageId: any,
  buildingName: string,
  fieldId: number,
  isBuilding: boolean,
  cancleJob: boolean,
  forceFinishJob: boolean
) => {
  const village = await Village.findOne({ userId: villageId });

  if (cancleJob) {
    village.currentlyBuilding = village.currentlyBuilding.filter(
      (building: any) => fieldId !== building.fieldId
    );
    await village.save();

    return;
  }

  const buildingObject = await getBuildingById(buildingName);
  const { villageResponse: villageObject }: any = await getVillageById(
    villageId
  );

  if (!buildingObject) {
    return { status: 404, msg: "Building not found!" };
  }

  if (villageObject.currentlyBuilding.length) {
    return { status: 400, msg: "Builders are currently unavailable!" };
  }

  const getBuildingCurrentLevel = (
    isBuilding === true
      ? villageObject.villageBuildings
      : villageObject.resourceFields
  ).find((building: any) => building.id === fieldId);

  if (getBuildingCurrentLevel === undefined) {
    return { status: 404, msg: "Building not found!" };
  }

  const getBuildingNextLevel =
    buildingObject.levels[0][
      `${!getBuildingCurrentLevel ? 1 : getBuildingCurrentLevel.level + 1}`
    ];

  if (!getBuildingNextLevel) {
    return { status: 400, msg: "Building is max level!" };
  }

  if (
    getBuildingCurrentLevel.type !== "empty_field" &&
    getBuildingCurrentLevel?.type !== buildingName
  ) {
    return { status: 400, msg: "Wrong buildingId type in request!" };
  }

  const { updateStorageWith: villageCurrentResources }: any =
    await updateVillageToDate(villageObject.userId);

  const buildingBuildTime = getBuildingNextLevel.timeToBuild;
  const buildingResourcesNeeded = {
    wood: getBuildingNextLevel.costWood,
    clay: getBuildingNextLevel.costClay,
    iron: getBuildingNextLevel.costIron,
    wheat: getBuildingNextLevel.costWheat,
  };

  if (
    villageCurrentResources.woodAmount < buildingResourcesNeeded.wood ||
    villageCurrentResources.clayAmount < buildingResourcesNeeded.clay ||
    villageCurrentResources.ironAmount < buildingResourcesNeeded.iron ||
    villageCurrentResources.wheatAmount < buildingResourcesNeeded.wheat
  ) {
    return { status: 400, msg: "Insufficient resources!" };
  }

  const endBuildTime = dayjs().add(buildingBuildTime, "s").toDate();

  const resourcesStorageMinus = {
    woodAmount:
      villageCurrentResources.woodAmount - buildingResourcesNeeded.wood,
    clayAmount:
      villageCurrentResources.clayAmount - buildingResourcesNeeded.clay,
    ironAmount:
      villageCurrentResources.ironAmount - buildingResourcesNeeded.iron,
    wheatAmount:
      villageCurrentResources.wheatAmount - buildingResourcesNeeded.wheat,
  };

  village.currentlyBuilding = [
    {
      buildingId: buildingName,
      currentlyBuildingLevel: getBuildingCurrentLevel
        ? getBuildingCurrentLevel.level + 1
        : 1,
      fieldId: fieldId,
      endBuildTime: endBuildTime,
      isBuilding: isBuilding,
    },
  ];

  village.resourcesStorage = resourcesStorageMinus;
  await village.save();

  console.log("Added currently building and reduced resources!");

  return {
    resourcesStorageMinus: resourcesStorageMinus,
    currentlyBuilding: {
      buildingId: buildingName,
      currentlyBuildingLevel: getBuildingCurrentLevel
        ? getBuildingCurrentLevel.level + 1
        : 1,
      fieldId: fieldId,
      endBuildTime: endBuildTime,
    },
  };
};

export { upgradeBuilding };
