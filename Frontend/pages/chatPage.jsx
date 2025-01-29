import React, { useEffect, useState } from "react";
import Chat from "../src/components/Chat";
import { useLocation } from "react-router-dom";
import UserList from "../src/components/UserList";
import styles from "../src/CSS/ChatPage.module.css";
import socket from "../socket";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatPage = () => {
  const location = useLocation();
  const { username, room } = location.state || {};

  const [usersList, setUsersList] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(room)
      .then(() => setCopySuccess("Copied!"))
      .catch(() => setCopySuccess("Failed to copy!"));

    setTimeout(() => setCopySuccess(""), 1000);
  };

  useEffect(() => {
    if (username && room) {
      socket.emit("join_room", { username, room });

      socket.on("user_list", (users) => {
        setUsersList(users);
      });

      return () => {
        socket.emit("leave_room", { username, room });
        socket.off("user_list");
      };
    }
  }, [username, room, socket]);

  return (
    <>
      <h1 className={styles.roomHeading}>
        Live Chat
        <span>
          Room {room}
          <button onClick={handleCopy} className={styles.copyButton}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
          {copySuccess && (
            <span className={styles.copyMessage}>{copySuccess}</span>
          )}
        </span>
      </h1>
      <div className={styles.chatContainer}>
        <UserList usersList={usersList} />
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
