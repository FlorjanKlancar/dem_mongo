import "../styles/globals.css";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import { initializeDataFetch } from "../utils/utilFunctions";
import { io } from "socket.io-client";

let firstLoad = true;

function MyApp({ Component, pageProps }: any) {
  const dispatch = useDispatch();

  const { data: session }: any = useSession();

  useEffect(() => {
    if (!session) return;

    if (firstLoad) {
      console.log("firstLoad", firstLoad);
      initializeDataFetch(session.user.uid, dispatch, true);
      firstLoad = false;

      const socket = io("http://localhost:5000");
      socket.on("connect", () => console.log(socket.id));
      socket.on("connect_error", () => {
        setTimeout(() => socket.connect(), 5000);
      });
    }
  }, [session]);

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
