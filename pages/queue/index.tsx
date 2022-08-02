import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import QueuePage from "../../components/Queue/QueuePage";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useUserVillage } from "../../hooks/useUserVillage";

function QueueView() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session.user.uid);

  if (isLoading)
    return (
      <>
        <NavbarDem />
        Skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (villageData && gameSettingsData)
    return (
      <>
        <NavbarDem />

        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <QueuePage
            villageUnits={villageData.units}
            gsUnits={gameSettingsData.unitsResponse}
            userId={session.user.uid}
          />
        </VillageWrapper>
      </>
    );
}

export default QueueView;

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
