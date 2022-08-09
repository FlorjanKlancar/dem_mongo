import { useRouter } from "next/router";
import React, { useEffect } from "react";

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
