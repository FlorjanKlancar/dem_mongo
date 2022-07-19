import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../../components/Navbar/NavbarDem";
import ReportsPage from "../../../components/Reports/ReportsPage";
import VillageWrapper from "../../../components/Wrapper/VillageWrapper";
import { battleReportModel } from "../../../types/battleReportModel";
import { RootState } from "../../../types/storeModel";
import { getBattleById } from "../../../utils/battlesFunctions";

type BattleIdPageProps = {
  battleReport: battleReportModel;
};

function BattleIdPage({ battleReport }: BattleIdPageProps) {
  const { loading } = useSelector((state: RootState) => state.loading);

  return (
    <>
      <NavbarDem />
      {loading ? (
        <>Skeleton</>
      ) : (
        <>
          <VillageWrapper>
            <ReportsPage singleBattle={battleReport} />
          </VillageWrapper>
        </>
      )}
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
