import { io } from "socket.io-client";

export const useWebSocket = () => {
  const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_IO_URL}`);

  return socket;
};
