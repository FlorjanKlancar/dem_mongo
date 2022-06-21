import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ResourcesField from "../../components/Resources/ResourcesField";
import VillageInfoWrapper from "../../components/Wrapper/VillageInfoWrapper";

function ResourcesView() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  console.log("session from sr", session);

  const testingHandler = async () => {
    const response = await axios.post(
      `/api/village/123`,
      {},
      { headers: { Authorization: `Bearer ${session?.accessToken}` } }
    );
    console.log("response", response);
  };

  return (
    <VillageInfoWrapper>
      <button className="text-white" onClick={testingHandler}>
        Click me
      </button>
      <ResourcesField />
    </VillageInfoWrapper>
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
