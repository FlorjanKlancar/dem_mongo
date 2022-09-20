import "../styles/globals.css";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import socket from "../lib/socket";
import { queueActions } from "../store/queue-slice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNextAuth } from "../hooks/useNextAuth";

function MyApp({ Component, pageProps }: any) {
  /*  const dispatch = useDispatch();

  const { session }: any = useNextAuth();

  useEffect(() => {
    if (!session) return;
  }, [session]);

  useEffect(() => {
    if (!session) return;
    socket.on("battleResponse", (data) => {
      if (data.response) {
        dispatch(queueActions.setUserInQueue(false));
      }
    });
  }, [socket]); */

  return (
    <div className="relative">
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function MyAppWithProvider({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MyApp Component={Component} pageProps={pageProps} />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyAppWithProvider;
