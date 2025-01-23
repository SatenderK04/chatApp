import React, { useEffect } from "react";
import JoinRoom from "../src/components/JoinRoom.jsx";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");
const Home = () => {
  const username = localStorage.getItem("username");
  // const room = localStorage.getItem("room");

  // useEffect(() => {
  //   if (!username || !room) {
  //     alert("You must log in first!");
  //   }
  //   window.location = "/";
  // }, [username, room]);

  return (
    <div>
      <h1>Welcome</h1>
      <p>Logged in as: {username}</p>
      {/* <UserList /> */}
      <JoinRoom username={username} socket={socket} />
      {/* <Chat username={username} room={room} /> */}
    </div>
  );
};

export default Home;
