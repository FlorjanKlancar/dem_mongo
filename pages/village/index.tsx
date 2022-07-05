import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import VillageSkeleton from "../../components/skeletons/VillageSkeleton";
import VillageField from "../../components/Village/VillageField";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function VillageView() {
  const { loading } = useSelector((state: RootState) => state.loading);

  return loading ? (
    <>
      <NavbarDem />
      <VillageSkeleton />
    </>
  ) : (
    <>
      <NavbarDem />
      <VillageWrapper>
        <VillageInfoWrapper>
          <VillageField />
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
