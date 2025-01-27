import React from "react";
import Chat from "../src/components/Chat";
import { useLocation } from "react-router-dom";
import UserList from "../src/components/UserList";
import styles from "../src/CSS/ChatPage.module.css";

const ChatPage = () => {
  const location = useLocation();

  // Access state passed from JoinRoom
  const { username, room } = location.state || {};
  console.log(username, room);
  return (
    <>
      <h1 className={styles.roomHeading}>
        Live Chat <span>Room {room}</span>
      </h1>
      <div className={styles.chatContainer}>
        <UserList />
        {username && room ? (
          <Chat username={username} room={room} />
        ) : (
          <p>Error: Missing username or room information</p>
        )}
      </div>
    </>
  );
};

export default ChatPage;
