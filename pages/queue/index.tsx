import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import QueuePage from "../../components/Queue/QueuePage";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function QueueView() {
  const { loading } = useSelector((state: RootState) => state.loading);

  return (
    <>
      <NavbarDem />
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <VillageWrapper>
            <QueuePage />
          </VillageWrapper>
        </>
      )}
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
