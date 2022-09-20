import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import StatisticsTableSkeleton from "../../components/skeletons/StatisticsTableSkeleton";
import StatististicsTable from "../../components/Statistics/StatististicsTable";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useStatistics } from "../../hooks/useStatistics";
import { useUserVillage } from "../../hooks/useUserVillage";

function StatisticsView() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const { data: villageData } = useUserVillage(session.user.id);
  const { data: statistics, isLoading, isError } = useStatistics();

  if (isLoading)
    return (
      <>
        <NavbarDem />
        <StatisticsTableSkeleton />
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (statistics && villageData && gameSettingsData)
    return (
      <>
        <NavbarDem />

        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <StatististicsTable players={statistics} />
        </VillageWrapper>
      </>
    );
}

export default StatisticsView;

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
