import { io } from "socket.io-client";

const socket = io("https://chatapp-backend-yn09.onrender.com");

export default socket;
