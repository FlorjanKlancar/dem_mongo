import axios from "axios";
import { gsBuildingsActions } from "../store/gsBuildings-slice";
import { gsUnitsActions } from "../store/gsUnits-slice";
import { loadingActions } from "../store/loading-slice";
import { villageActions } from "../store/village-slice";

export const initializeDataFetch = async (userId: string, dispatch: any) => {
  console.log("initialize fetch");
  const village = await axios.get(`/api/village/${userId}`);

  const response = await axios.get(`/api/initialize`);

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

  dispatch(
    gsUnitsActions.initializeGsUnits({ gsUnits: response.data.unitsResponse })
  );
  dispatch(
    gsBuildingsActions.initializeGsBuildings({
      gsBuildings: response.data.buildingsResponse,
    })
  );

  dispatch(loadingActions.setLoading(false));
};
