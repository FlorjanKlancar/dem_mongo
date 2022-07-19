import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import Village from "../mongoose/Village";
import { battleReportsActions } from "../store/battleReports-slice";
import { gsBuildingsActions } from "../store/gsBuildings-slice";
import { gsUnitsActions } from "../store/gsUnits-slice";
import { heroActions } from "../store/hero-slice";
import { loadingActions } from "../store/loading-slice";
import { villageActions } from "../store/village-slice";
import { getBuildingById } from "./gsBuildingsFunctions";

type createUpdatedObjectProps = {
  buildingName: string;
  currentlyBuildingLevel: number;
  fieldId: number;
  endBuildTime: Date;
  isBuilding: boolean;
  villageObject: any;
};

dayjs.extend(duration);

const createUpdatedObject = async ({
  buildingName,
  currentlyBuildingLevel,
  fieldId,
  endBuildTime,
  isBuilding,
  villageObject,
}: createUpdatedObjectProps) => {
  const getBuildingNextLevel = getBuildingById(buildingName);
  console.log("getBuildingNextLevel", getBuildingNextLevel);

  let updatedObjectTemp = {};

  /*  const iteration =
    isBuilding       ? villageObject.villageBuildings
      : villageObject.resourceFields;

  updatedObjectTemp = iteration.map((item: any) => {
    if (item.id === fieldId) {
      return {
        gridPosition: item.gridPosition,
        description: item.description,
        id: item.id,
        type: item.type,
        level: currentlyBuildingLevel,
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
  }); */

  return updatedObjectTemp;
};

const checkForBuildingUpdate = async (village: any) => {
  const serverTime = dayjs().toDate();

  const checkEndBuildingTimes = village.currentlyBuilding.map(
    (building: any) => {
      if (building.endBuildTime < serverTime) {
        await createUpdatedObject(building);
        console.log("end build for", serverTime, building);
      } else {
        console.log("still building", serverTime);
      }
    }
  );

  return village;
};

const initializeDataFetch = async (
  userId: string,
  dispatch: any,
  firstLoad?: boolean
) => {
  try {
    const village: any = await axios.get(`/api/village/${userId}`);

    if (firstLoad) {
      const response: any = await axios.get(`/api/initialize`);
      dispatch(
        gsUnitsActions.initializeGsUnits({
          gsUnits: response.data.unitsResponse,
        })
      );
      dispatch(
        gsBuildingsActions.initializeGsBuildings({
          gsBuildings: response.data.buildingsResponse,
        })
      );

      const responseUser: any = await axios.get(`/api/user/${userId}`);

      dispatch(
        heroActions.setHero({
          resources: [{ uri: responseUser.data.user.heroIcon }],
        })
      );
    }
    const getUnReadReports: any = await axios.get(`/api/battle/${userId}`);

    dispatch(
      battleReportsActions.setBattleReports({
        unreadBattleReports: getUnReadReports.data.newReports,
        battleReports: getUnReadReports.data.battles,
      })
    );

    dispatch(
      villageActions.setVillage({
        id: village.data._id,
        population: village.data.population,
        resourceFields: village.data.resourceFields,
        resourcesStorage: village.data.resourcesStorage,
        villageBuildings: village.data.villageBuildings,
        woodProductionPerH: village.data.woodProductionPerH,
        clayProductionPerH: village.data.clayProductionPerH,
        ironProductionPerH: village.data.ironProductionPerH,
        wheatProductionPerH: village.data.wheatProductionPerH,
        currentlyBuilding: village.data.currentlyBuilding,
        units: village.data.units,
        unitTrainQueue: village.data.unitTrainQueue,
        createdAt: village.data.createdAt,
        updatedAt: village.data.updatedAt,
      })
    );

    dispatch(loadingActions.setLoading(false));
  } catch (e: any) {
    console.error("error", e);
  }
};

async function updateResourcesToDate(villageObject: any, villageId: string) {
  const serverTime = dayjs().toDate();

  const lastVillageUpdateTime = villageObject.updatedAt;
  const villageWoodProduction = villageObject.woodProductionPerH;
  const villageClayProduction = villageObject.clayProductionPerH;
  const villageIronProduction = villageObject.ironProductionPerH;
  const villageWheatProduction = villageObject.wheatProductionPerH;

  const findWarehouseInVillage = villageObject.villageBuildings.find(
    (building: any) => building.type === "warehouse"
  );

  const findGranaryInVillage = villageObject.villageBuildings.find(
    (building: any) => building.type === "granary"
  );

  const warehouseAllLevels: any = await getBuildingById("warehouse");
  const granaryAllLevels: any = await getBuildingById("granary");

  if (!warehouseAllLevels || !granaryAllLevels) {
    return "Warehouse and granary not found";
  }

  const warehouseMaxResourcesForCurrentLevel = findWarehouseInVillage
    ? warehouseAllLevels.levels[0][`${findWarehouseInVillage.level}`]
        .warehouseResourceLimit
    : 800;

  const granaryMaxResourcesForCurrentLevel = findGranaryInVillage
    ? granaryAllLevels.levels[0][`${findGranaryInVillage.level}`]
        .warehouseResourceLimit
    : 800;

  const date1 = dayjs(serverTime);
  const date2 = dayjs(lastVillageUpdateTime);
  const diffInMS = date1.diff(date2);

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

  const village = await Village.findOne({ _id: villageId });
  village.resourcesStorage = updateStorageWith;
  if (village.currentlyBuilding.length) {
    const response = await checkForBuildingUpdate(village);
  }

  village.save();

  return updateStorageWith;
}

export { initializeDataFetch, updateResourcesToDate };
