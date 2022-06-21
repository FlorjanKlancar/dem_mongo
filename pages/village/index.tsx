import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../components/skeletons/VillageSkeleton";
import VillageField from "../../components/Village/VillageField";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function VillageView() {
  const villageId: string = useSelector((state: RootState) => state.village.id);

  return !villageId ? (
    <>
      <NavbarDem />
      <VillageSkeleton />
    </>
  ) : (
    <>
      <NavbarDem />
      <VillageWrapper>
        <VillageInfoWrapper>
          <VillageField />
        </VillageInfoWrapper>
      </VillageWrapper>
    </>
  );
}

export default VillageView;
