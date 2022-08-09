import Head from "next/head";
import NewLogin from "../../components/Auth/NewLogin";

function RegisterPage() {
  return (
    <div className="relative space-y-10">
      <Head>
        <title>DEM Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewLogin isRegisterPage={true} />
    </div>
  );
}

export default RegisterPage;
