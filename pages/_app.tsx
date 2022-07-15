import "../styles/globals.css";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import { initializeDataFetch } from "../utils/utilFunctions";
import socket from "../lib/socket";
import { queueActions } from "../store/queue-slice";

let firstLoad = true;

function MyApp({ Component, pageProps }: any) {
  const dispatch = useDispatch();

  const { data: session }: any = useSession();

  useEffect(() => {
    if (!session) return;

    if (firstLoad && session.user.uid) {
      console.log("firstLoad", firstLoad);
      initializeDataFetch(session.user.uid, dispatch, true);
      firstLoad = false;
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;
    socket.on("battleResponse", (data) => {
      if (data.response) {
        dispatch(queueActions.setUserInQueue(false));
        initializeDataFetch(session.user.uid, dispatch);
      }
    });
  }, [socket]);

  return (
    <div className="relative">
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
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
