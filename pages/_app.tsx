import "../styles/globals.css";

import NavbarDem from "../components/Navbar/NavbarDem";
import VillageWrapper from "../components/Wrapper/VillageWrapper";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/clientApp";
import { Provider, useDispatch } from "react-redux";
import { villageActions } from "../store/village-slice";
import store from "../store";
import axios from "axios";
import { gsUnitsActions } from "../store/gsUnits-slice";
import { gsBuildingsActions } from "../store/gsBuildings-slice";
import LoginComponent from "../components/Auth/LoginComponent";
import { useAuthState } from "react-firebase-hooks/auth";
import VillageSkeleton from "../components/skeletons/VillageSkeleton";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";

let firstLoad = true;

function MyApp({ Component, pageProps }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const { data: session, status }: any = useSession();
  console.log("status", status);

  const initializeDataFetch = async () => {
    console.log("initialize fetch");
    await axios.get(`/api/village/${session.user.uid}`);

    const response = await axios.get(`/api/initialize`);

    dispatch(
      gsUnitsActions.initializeGsUnits({ gsUnits: response.data.unitsResponse })
    );
    dispatch(
      gsBuildingsActions.initializeGsBuildings({
        gsBuildings: response.data.buildingsResponse,
      })
    );

    setIsLoading(false);
  };

  useEffect(() => {
    if (!session.user) return;

    if (!firstLoad) {
      initializeDataFetch();
    }
    firstLoad = false;
  }, []);

  return (
    <div className="relative">
      {/*  {!user ? (
        <Login />
      ) : (
        <>
          <NavbarDem />
          {isLoading ? (
            <VillageSkeleton />
          ) : ( */}
      {/*  <VillageWrapper> */}
      <NavbarDem />
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
      {/*  </VillageWrapper> */}
      {/*   )}
        </>
      )} */}
    </div>
  );
}

function MyAppWithProvider({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <MyApp Component={Component} pageProps={pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyAppWithProvider;
