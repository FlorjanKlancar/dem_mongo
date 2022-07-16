import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

function RootPage() {
  const router = useRouter();

  const redirect = () => {
    router.push("/resources");
  };

  useEffect(() => {
    redirect();
  }, []);

  return <div></div>;
}

export default RootPage;
