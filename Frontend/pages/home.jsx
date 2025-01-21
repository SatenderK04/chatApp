import React, { useEffect } from "react";
import Chat from "../src/assets/components/Chat.jsx";
import UserList from "../src/assets/components/UserList.jsx";

function Home() {
  const username = localStorage.getItem("username");
  const room = localStorage.getItem("room");

  useEffect(() => {
    if (!username || !room) {
      alert("You must log in first!");
      window.location = "/";
    }
  }, [username, room]);

  return (
    <div>
      <h1>Welcome to Room: {room}</h1>
      <p>Logged in as: {username}</p>
      {/* Include your main app components */}
      <UserList />
      <Chat username={username} room={room} />
    </div>
  );
}

export default Home;
