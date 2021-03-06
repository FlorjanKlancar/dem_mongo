import axios from "axios";
import {battleReportsActions} from "../store/battleReports-slice";
import {gsBuildingsActions} from "../store/gsBuildings-slice";
import {gsUnitsActions} from "../store/gsUnits-slice";
import {heroActions} from "../store/hero-slice";
import {loadingActions} from "../store/loading-slice";
import {villageActions} from "../store/village-slice";

export const initializeDataFetch = async (
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
          resources: [{uri: responseUser.data.user.heroIcon}],
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
