import "../styles/globals.css";

import NavbarDem from "../components/Navbar/NavbarDem";
import VillageWrapper from "../components/Wrapper/VillageWrapper";
import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {auth, db} from "../firebase/clientApp";
import {Provider, useDispatch} from "react-redux";
import {villageActions} from "../store/village-slice";
import store from "../store";
import axios from "axios";
import {gsUnitsActions} from "../store/gsUnits-slice";
import {gsBuildingsActions} from "../store/gsBuildings-slice";
import Login from "../components/Auth/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import VillageSkeleton from "../components/skeletons/VillageSkeleton";
import {Toaster} from "react-hot-toast";

function MyApp({Component, pageProps}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const [user]: any = useAuthState(auth);

  const initializeDataFetch = async () => {
    console.log("initialize fetch");
    await axios.get(`/api/village/${user?.uid}`, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });

    const response = await axios.get(`/api/initialize`, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });

    dispatch(
      gsUnitsActions.initializeGsUnits({gsUnits: response.data.unitsResponse})
    );
    dispatch(
      gsBuildingsActions.initializeGsBuildings({
        gsBuildings: response.data.buildingsResponse,
      })
    );

    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdToken().then(function (idToken) {
          console.log("idToken", idToken);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    initializeDataFetch();

    const villageDocRef = doc(db, "village", user.uid);

    return onSnapshot(villageDocRef, {
      next: (docSnapshot) => {
        if (!docSnapshot.exists()) {
          return dispatch(villageActions.removeVillage());
        }
        var docData = docSnapshot.data();

        dispatch(
          villageActions.setVillage({
            ...docData,
            id: docSnapshot.id,
            ...(docSnapshot.data().currentlyBuilding.length && {
              currentlyBuilding: [
                {
                  ...docSnapshot.data().currentlyBuilding[0],
                  endBuildTime: docSnapshot
                    .data()
                    .currentlyBuilding[0].endBuildTime.toMillis(),
                },
              ],
            }),

            ...(docSnapshot.data().unitTrainQueue.length && {
              unitTrainQueue: docSnapshot
                .data()
                .unitTrainQueue.map((unit: any) => {
                  return {
                    ...unit,
                    endThisBuild: unit.endThisBuild.toMillis(),
                  };
                }),
            }),
            createdAt: docSnapshot.data().createdAt.toMillis(),
            updatedAt: docSnapshot.data().updatedAt.toMillis(),
          })
        );
      },
      error: (err) => {
        console.error("Failed to get village data ", err);
        dispatch(villageActions.removeVillage());
      },
    });
  }, [user]);

  return (
    <div className="relative">
      {!user ? (
        <Login />
      ) : (
        <>
          <NavbarDem />
          {isLoading ? (
            <VillageSkeleton />
          ) : (
            <VillageWrapper>
              <Toaster position="top-center" reverseOrder={false} />
              <Component {...pageProps} />
            </VillageWrapper>
          )}
        </>
      )}
    </div>
  );
}

function MyAppWithProvider({Component, pageProps}: any) {
  return (
    <Provider store={store}>
      <MyApp Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyAppWithProvider;
