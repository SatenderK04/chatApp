import React from "react";
import Chat from "../src/components/Chat";
import { useLocation } from "react-router-dom";
import UserList from "../src/components/UserList";

const ChatPage = () => {
  const location = useLocation();

  // Access state passed from JoinRoom
  const { username, room } = location.state || {};
  console.log(username, room);
  return (
    <>
      {/* <UserList /> */}
      {username && room ? (
        <Chat username={username} room={room} />
      ) : (
        <p>Error: Missing username or room information</p>
      )}
    </>
  );
};

export default ChatPage;
