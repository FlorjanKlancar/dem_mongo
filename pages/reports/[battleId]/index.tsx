import { GetServerSidePropsContext } from "next";
import React from "react";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import ReportsPage from "../../../components/Reports/ReportsPage";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import { useGameSettings } from "../../../hooks/useGameSettings";
import { useNextAuth } from "../../../hooks/useNextAuth";
import { useUserVillage } from "../../../hooks/useUserVillage";
import { battleReportModel } from "../../../types/battleReportModel";
import { getBattleById } from "../../../utils/battlesFunctions";

type BattleIdPageProps = {
  battleReport: battleReportModel;
};

function BattleIdPage({ battleReport }: BattleIdPageProps) {
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
          <ReportsPage singleBattle={battleReport} />
        </VillageWrapper>
      </>
    );
}

export default BattleIdPage;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const battleId = params!.battleId;

  if (battleId) {
    const getBattleInfo = await getBattleById(battleId.toString());

    if (!getBattleInfo) {
      return { notFound: true };
    }
    return {
      props: { battleReport: JSON.parse(JSON.stringify(getBattleInfo)) },
    };
  }
}
