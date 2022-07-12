import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import ReportsPage from "../../components/Reports/ReportsPage";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function Reports() {
  const { loading } = useSelector((state: RootState) => state.loading);
  const { battleReports } = useSelector(
    (state: RootState) => state.battleReports
  );

  return (
    <>
      <NavbarDem />
      {loading ? (
        <>Skeleton</>
      ) : (
        <>
          <VillageWrapper>
            <ReportsPage battles={battleReports} />
          </VillageWrapper>
        </>
      )}
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
