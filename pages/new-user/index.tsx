import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Spinner from "../../components/Spinner/Spinner";

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

    if (response.status === 201) {
      router.push("/resources");
    }
  };

  useEffect(() => {
    if (session?.user?.uid) {
      createNewVillage();
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center space-y-12 pt-32">
      <div>
        <h1 className="text-2xl font-semibold text-slate-700">
          Creating new village
        </h1>
      </div>
      <div>
        <Spinner />
      </div>
    </div>
  );
}

export default NewUser;
