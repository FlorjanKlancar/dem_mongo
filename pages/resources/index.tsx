import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import ResourcesField from "../../components/Resources/ResourcesField";
import VillageSkeleton from "../../components/skeletons/VillageSkeleton";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useUserVillage } from "../../hooks/useUserVillage";
import { useWebSocket } from "../../hooks/useWebSocket";

function ResourcesView() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session.user.id);

  const socket = useWebSocket();

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
            <ResourcesField
              villageData={villageData}
              gsBuildings={gameSettingsData.buildingsResponse}
            />
          </VillageInfoWrapper>
        </VillageWrapper>
      </>
    );
}

export default ResourcesView;

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
