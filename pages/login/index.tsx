import { GetServerSideProps } from "next";
import { getProviders } from "next-auth/react";
import React from "react";
import NewLogin from "../../components/Auth/NewLogin";

function LoginPage({ providers }: any) {
  return <NewLogin providers={providers} />;
}

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
