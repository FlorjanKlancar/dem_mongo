import dayjs from "dayjs";
import Village from "../mongoose/Village";
import { buildingModel } from "../types/buildingModel";
import { getBuildingById } from "./gsBuildingsFunctions";
import { updateResourcesToDate } from "./utilFunctions";
import { getVillageById } from "./villageFunctions";

const createUpdatedObject = (
  isBuilding: boolean,
  buildingName: string,
  fieldId: number,
  villageObject: any,
  getBuildingCurrentLevel: any,
  getBuildingNextLevel: buildingModel,
  buildingObject: buildingModel
) => {
  let updatedObjectTemp = {};

  const iteration =
    isBuilding === true
      ? villageObject.villageBuildings
      : villageObject.resourceFields;

  updatedObjectTemp = iteration.map((item: any) => {
    if (item.id === fieldId) {
      return {
        gridPosition: item.gridPosition,
        description: item.description,
        id: item.id,
        type: item.type,
        level: getBuildingCurrentLevel ? getBuildingCurrentLevel.level + 1 : 1,
        imageGrid: getBuildingNextLevel.image
          ? getBuildingNextLevel.image
          : buildingObject.image,
        ...(isBuilding === true && {
          type: buildingName,
        }),
        ...(buildingObject.description && {
          description: buildingObject.description,
        }),
      };
    } else {
      return item;
    }
  });

  return updatedObjectTemp;
};

const upgradeBuilding = async (
  villageId: any,
  buildingName: string,
  fieldId: number,
  isBuilding: boolean,
  cancleJob: boolean,
  forceFinishJob: boolean
) => {
  const village = await Village.findOne({ userId: villageId });
  const buildingNamePrefix = buildingName.split("_");

  if (cancleJob) {
    village.currentlyBuilding = village.currentlyBuilding.filter(
      (building: any) => fieldId !== building.fieldId
    );
    await village.save();

    return;
  }

  /*     if (forceFinishJob && Object.keys(schedule.scheduledJobs).length !== 0) {
      var my_job = schedule.scheduledJobs[buildingName];
  
      my_job.cancel();
  
      const villageObject = await getVillageById(villageId);
      const buildingObject = await getBuildingById(buildingName);
  
      const getBuildingCurrentLevel = (
        isBuilding === true
          ? villageObject.villageBuildings
          : villageObject.resourceFields
      ).find((building) => building.id === fieldId);
      const getBuildingNextLevel =
        buildingObject.levels[0][
          `${!getBuildingCurrentLevel ? 1 : getBuildingCurrentLevel.level + 1}`
        ];
  
      const updatedObject = createUpdatedObject(
        isBuilding,
        buildingName,
        fieldId,
        villageObject,
        getBuildingCurrentLevel,
        getBuildingNextLevel,
        buildingObject
      );
  
      console.log("Execute update!", dayjs().toDate());
  
      village.currentlyBuilding = [];
  
      village.population =
        villageObject.population + getBuildingNextLevel.populationAdd;
  
      if (isBuilding === true) {
        village.villageBuildings = updatedObject;
      } else {
        village.resourceFields = updatedObject;
        village[`${buildingNamePrefix[0]}ProductionPerH`] =
          getBuildingNextLevel.productionAdd +
          villageObject[`${buildingNamePrefix[0]}ProductionPerH`];
      }
  
      await village.save();
  
      return res.status(StatusCodes.OK).send("Force update finished");
    } */

  /*   if (cancleJob && Object.keys(schedule.scheduledJobs).length !== 0) {
      var my_job = schedule.scheduledJobs[buildingName];
  
      console.log("my_job", my_job);
      my_job.cancel();
  
      console.log("cancled job!");
      village.currentlyBuilding = [];
      village.save();
  
      return res.status(StatusCodes.OK).json({msg: "Job canceled successfully!"});
    } else { */

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

  const villageCurrentResources: any = await updateResourcesToDate(
    villageObject,
    village._id
  );

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

  const updatedObject = createUpdatedObject(
    isBuilding,
    buildingName,
    fieldId,
    villageObject,
    getBuildingCurrentLevel,
    getBuildingNextLevel,
    buildingObject
  );

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

  /*       const job = schedule.scheduleJob(
        buildingName,
        endBuildTime,
        async function () {
          console.log("Execute update!", dayjs().toDate());
          const village = await Village.findOne({userId: villageId});
  
          village.currentlyBuilding = [];
  
          village.population =
            villageObject.population + getBuildingNextLevel.populationAdd;
  
          if (isBuilding === true) {
            village.villageBuildings = updatedObject;
          } else {
            village.resourceFields = updatedObject;
            village[`${buildingNamePrefix[0]}ProductionPerH`] =
              getBuildingNextLevel.productionAdd +
              villageObject[`${buildingNamePrefix[0]}ProductionPerH`];
          }
  
          await village.save();
        }
      ); */

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
  /*  } */
};

export { upgradeBuilding };
