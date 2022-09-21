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
import MatchFoundModal from "../components/Queue/MatchFoundModal";
import { battleReportModel } from "../types/battleReportModel";

function MyApp({ Component, pageProps }: any) {
  const { session }: any = useNextAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [battleInfo, setBattleInfo] = useState<battleReportModel | {}>({});

  useEffect(() => {
    if (!session) return;
    socket.on("connect", () => console.log("socket_id", socket.id));
    socket.on("matchFoundWaitingForAccept", ({ response }) => {
      console.log("response useef", response);
      setIsModalOpen(true);
      setBattleInfo(response);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="relative">
      <Component {...pageProps} />
      {session && (
        <Modal open={isModalOpen} setOpen={setIsModalOpen}>
          <MatchFoundModal
            setOpen={setIsModalOpen}
            battleInfo={battleInfo}
            sessionId={session.user.id}
          />
        </Modal>
      )}
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
