import React from "react";
import VillageInfoResourcesSidebar from "../VillageInfo/VillageInfoResourcesSidebar";
import VillageInfoTroops from "../VillageInfo/VillageInfoTroops";
import VillageInfoCurrentlyBuilding from "../VillageInfo/VillageInfoCurrentlyBuilding";
import { villageModel } from "../../types/villageModel";
import { unitModel } from "../../types/unitModel";
import { buildingModel } from "../../types/buildingModel";

type VillageInfoWrapperProps = {
  children: React.ReactNode;
  villageData: villageModel;
  gsUnits: unitModel[];
  gsBuildings: buildingModel[];
};

function VillageInfoWrapper({
  children,
  villageData,
  gsUnits,
  gsBuildings,
}: VillageInfoWrapperProps) {
  const resourcesSidebar = {
    woodProductionPerH: villageData?.woodProductionPerH,
    clayProductionPerH: villageData?.clayProductionPerH,
    ironProductionPerH: villageData?.ironProductionPerH,
    wheatProductionPerH: villageData?.wheatProductionPerH,
  };
  const villageInfoTroops = villageData.units;

  return (
    <>
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0">
        {children}
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 md:ml-8 md:w-1/3 md:flex-col md:space-y-4 md:space-x-0">
          <VillageInfoResourcesSidebar resourcesSidebar={resourcesSidebar} />
          <VillageInfoTroops
            villageInfoTroops={villageInfoTroops}
            gsUnits={gsUnits}
          />
        </div>
      </div>
      <VillageInfoCurrentlyBuilding
        villageData={villageData}
        gsBuildings={gsBuildings}
      />
    </>
  );
}

export default VillageInfoWrapper;
