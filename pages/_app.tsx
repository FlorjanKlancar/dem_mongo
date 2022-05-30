import "../styles/globals.css";

import Wrapper from "../components/Navbar/Wrapper/Wrapper";
import NavbarDem from "../components/Navbar/NavbarDem";
import VillageWrapper from "../components/Navbar/Wrapper/VillageWrapper";
import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {auth, db} from "../firebase/clientApp";
import {Provider, useDispatch} from "react-redux";
import {villageActions} from "../store/village-slice";
import store from "../store";
import axios from "axios";
import {gsUnitsActions} from "../store/gsUnits-slice";
import {gsBuildingsActions} from "../store/gsBuildings-slice";
import Login from "../components/Navbar/Auth/Login";
import {useAuthState} from "react-firebase-hooks/auth";
import VillageSkeleton from "../components/skeletons/VillageSkeleton";

function MyApp({Component, pageProps}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const [user]: any = useAuthState(auth);

  const initializeDataFetch = async () => {
    await axios.get(`api/village/${user?.uid}`, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });
    const buildingsResponse = await axios.get(`api/gsBuildings`, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });
    const unitsResponse = await axios.get(`api/gsUnits`, {
      headers: {Authorization: `Bearer ${user?.accessToken}`},
    });

    dispatch(gsUnitsActions.initializeGsUnits({gsUnits: unitsResponse.data}));
    dispatch(
      gsBuildingsActions.initializeGsBuildings({
        gsBuildings: buildingsResponse.data,
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
    <Wrapper>
      <div className="relative">
        {!user ? (
          <Login />
        ) : (
          <>
            <NavbarDem />
            {isLoading ? (
              <VillageSkeleton />
            ) : (
              <>
                <VillageWrapper>
                  <Component {...pageProps} />
                </VillageWrapper>
              </>
            )}
          </>
        )}
      </div>
    </Wrapper>
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
