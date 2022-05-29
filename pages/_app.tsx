import "../styles/globals.css";

import Wrapper from "../components/Navbar/Wrapper/Wrapper";
import NavbarDem from "../components/Navbar/NavbarDem";
import VillageWrapper from "../components/Navbar/Wrapper/VillageWrapper";
import Auth from "../components/Navbar/Auth/Auth";
import {AuthUserProvider, useAuth} from "../context/Authentication";
import {useEffect, useState} from "react";
import {doc, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../firebase/clientApp";
import {Provider, useDispatch, useSelector} from "react-redux";
import {villageActions} from "../store/village-slice";
import store from "../store";
import axios from "axios";
import {gsUnitsActions} from "../store/gsUnits-slice";
import {gsBuildingsActions} from "../store/gsBuildings-slice";

function MyApp({Component, pageProps}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const {authUser: user, loading} = useAuth();

  const token = useSelector((state: any) => state.auth.token);

  const initializeDataFetch = async () => {
    await axios.get(
      `${process.env.NEXT_PUBLIC_NODEJS_APP}/village/${user.uid}`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    const buildingsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_NODEJS_APP}/gsBuildings`,
      {headers: {Authorization: `Bearer ${token}`}}
    );
    const unitsResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_NODEJS_APP}/gsUnits`,
      {headers: {Authorization: `Bearer ${token}`}}
    );

    console.log(buildingsResponse, unitsResponse);

    dispatch(gsUnitsActions.initializeGsUnits({gsUnits: unitsResponse.data}));
    dispatch(
      gsBuildingsActions.initializeGsBuildings({
        gsBuildings: buildingsResponse.data,
      })
    );

    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    if (token.length > 4) {
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
    }
  }, [user]);

  console.log("token", token);

  return (
    <Wrapper>
      <div className="relative">
        {token.length <= 4 ? (
          <Auth />
        ) : (
          <>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              <>
                <NavbarDem />
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
      <AuthUserProvider>
        <MyApp Component={Component} pageProps={pageProps} />
      </AuthUserProvider>
    </Provider>
  );
}

export default MyAppWithProvider;
