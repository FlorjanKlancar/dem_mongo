import "../styles/globals.css";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "../store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { queueActions } from "../store/queue-slice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNextAuth } from "../hooks/useNextAuth";
import { socket } from "../lib/socket";
import Modal from "../components/Modal/Modal";

function MyApp({ Component, pageProps }: any) {
  const { session }: any = useNextAuth();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!session) return;
    socket.on("connect", () => console.log("socket_id", socket.id));

    //na ta event se nardi popup
    socket.on("acceptMatch", (data) => {
      console.log("Treba bo acceptat " + data);
      //spremeni state za popup
    });

    //ta event pomen da nekdo od igralcev ni acceptov matcha
    socket.on("matchNotAccepted", (data) => {
      console.log("En je zamudu " + data);
      // clientRoom = data;
    });

    console.log("app.ts");

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="relative">
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
      <Modal open={open} setOpen={setOpen}>
        <div>helo</div>
      </Modal>
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
