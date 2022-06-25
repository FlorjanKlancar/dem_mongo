import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeDataFetch } from "../utils/utilFunctions";

function RootPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { data: session }: any = useSession();

  const redirect = () => {
    router.push("/resources");
    //initializeDataFetch(session?.user.uid, dispatch);
  };

  useEffect(() => {
    //if (!session) return;

    redirect();
  }, []);

  return <div></div>;
}

export default RootPage;
