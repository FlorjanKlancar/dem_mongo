import Head from "next/head";
import { getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";
import { providerModel } from "../../types/providerModel";
import NewLogin from "../../components/Auth/NewLogin";

type LoginProps = {
  providers: providerModel[];
};

function Login({ providers }: LoginProps) {
  return (
    <div className="relative space-y-10">
      <Head>
        <title>DEM Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewLogin providers={providers} isRegisterPage={false} />
    </div>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
