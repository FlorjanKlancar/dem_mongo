import React from "react";
import VillageInfoResourcesSidebar from "../VillageInfo/VillageInfoResourcesSidebar";
import VillageInfoTroops from "../VillageInfo/VillageInfoTroops";
import VillageInfoCurrentlyBuilding from "../VillageInfo/VillageInfoCurrentlyBuilding";

type VillageInfoWrapperProps = {
  children: React.ReactNode;
};

function VillageInfoWrapper({ children }: VillageInfoWrapperProps) {
  return (
    <>
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0">
        {children}
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 md:ml-8 md:w-1/3 md:flex-col md:space-y-4 md:space-x-0">
          <VillageInfoResourcesSidebar />
          <VillageInfoTroops />
        </div>
      </div>
      <VillageInfoCurrentlyBuilding />
    </>
  );
}

export default VillageInfoWrapper;
