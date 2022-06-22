import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import NavbarDem from "../../components/Navbar/NavbarDem";
import ResourcesField from "../../components/Resources/ResourcesField";
import VillageSkeleton from "../../components/skeletons/VillageSkeleton";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";
import VillageWrapper from "../../components/Wrapper/VillageWrapper";
import { RootState } from "../../types/storeModel";

function ResourcesView() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

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
          <ResourcesField />
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
