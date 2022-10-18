import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import NavbarDem from "../../components/Navbar/NavbarDem";
import ReportsPage from "../../components/Reports/ReportsPage";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../hooks/useGameSettings";
import { useNextAuth } from "../../hooks/useNextAuth";
import { useReports } from "../../hooks/useReports";
import { useUserVillage } from "../../hooks/useUserVillage";

function Reports() {
  const { session }: any = useNextAuth();
  const { data: gameSettingsData } = useGameSettings();
  const { data: villageData } = useUserVillage(session?.user.id);
  const {
    data: reportsData,
    isLoading,
    isError,
  } = useReports(session?.user.id);

  if (isLoading)
    return (
      <>
        <NavbarDem />
        Skeleton
      </>
    );

  if (isError) return <div>Error: {isError}</div>;

  if (reportsData && villageData && gameSettingsData)
    return (
      <>
        <NavbarDem />

        <VillageWrapper
          villageData={villageData}
          gameSettings={gameSettingsData}
        >
          <ReportsPage battles={reportsData.battles} />
        </VillageWrapper>
      </>
    );
}

export default Reports;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Check if the user is authenticated on the server...
  const session: any = await getSession(context);
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
