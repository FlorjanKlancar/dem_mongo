import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function NewUser() {
  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  console.log("session", session);

  const createNewVillage = async () => {
    const response = await axios.post(`/api/village/${session?.user?.uid}`);
    console.log("response", response);

    if (response.status === 200) {
      //router.push("/resources");
    }
  };

  useEffect(() => {
    createNewVillage();
  }, [session]);

  return <div>This is new user page</div>;
}

export default NewUser;
