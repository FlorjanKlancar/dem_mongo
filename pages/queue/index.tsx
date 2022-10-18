import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import QueuePage from "../../components/Queue/QueuePage";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useQueue } from "../../hooks/useQueue";
import { useUserVillage } from "../../hooks/useUserVillage";

function QueueView() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const {
    data: villageData,
    isLoading,
    isError,
  } = useUserVillage(session?.user.id);
  const { data: queueData, isLoading: queueIsLoading } = useQueue(
    session?.user?.id
  );

  if (isLoading || queueIsLoading)
    return (
      <>
        <NavbarDem />
        Loading skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (villageData && gameSettingsData && !queueIsLoading)
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
            userId={session.user.id}
            queueData={queueData}
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
