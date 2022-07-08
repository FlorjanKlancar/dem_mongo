import io from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_IO_URL}`);
socket.on("connect", () => console.log(socket.id));
export default socket;
