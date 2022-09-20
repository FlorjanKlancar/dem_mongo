import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../components/skeletons/VillageSkeleton";
import VillageField from "../../components/Village/VillageField";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useUserVillage } from "../../hooks/useUserVillage";

function VillageView() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session.user.id);

  if (isLoading)
    return (
      <>
        <NavbarDem />
        <VillageSkeleton />
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (gameSettingsData && villageData)
    return (
      <>
        <NavbarDem />
        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <VillageInfoWrapper
            villageData={villageData}
            gsBuildings={gameSettingsData.buildingsResponse}
            gsUnits={gameSettingsData.unitsResponse}
          >
            <VillageField
              villageData={villageData}
              gsBuildings={gameSettingsData.buildingsResponse}
            />
          </VillageInfoWrapper>
        </VillageWrapper>
      </>
    );
}

export default VillageView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
