import React from "react";
import ResourcesField from "../../components/Resources/ResourcesField";
import ResourcesTroopsInfo from "../../components/Resources/ResourcesTroopsInfo";
import VillageCurrentlyBuilding from "../../components/Resources/VillageCurrentlyBuilding";
import ResourcesProductionSidebar from "../../components/Resources/ResourcesProductionSidebar";

function Resources() {
  return (
    <>
      <div className="flex flex-col space-y-3 md:flex-row md:space-x-12 md:space-y-0">
        <ResourcesField />
        <div className="flex w-full flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 md:w-1/3 md:flex-col md:space-y-4 md:space-x-0">
          <ResourcesProductionSidebar />
          <ResourcesTroopsInfo />
        </div>
      </div>
      <VillageCurrentlyBuilding />
    </>
  );
}

export default Resources;
