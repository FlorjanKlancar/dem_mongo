import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Widgets/Spinner";

let firstLoad = true;

function NewUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status }: any = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const createNewVillage = async () => {
    const response = await axios.post(`/api/village/${session?.user?.uid}`);

    if (response.status === 201) {
      router.push("/resources");
    }
  };

  useEffect(() => {
    if (!session) return;

    if (firstLoad && session.user.uid) {
      createNewVillage();
      firstLoad = false;
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center space-y-12 pt-56">
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
