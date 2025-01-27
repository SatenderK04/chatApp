import React, { useEffect } from "react";
import JoinRoom from "../src/components/JoinRoom.jsx";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
import styles from "../src/CSS/HomePage.module.css";

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.username}>
        Welcome <span>{username}</span> !
      </h1>
      <div className={styles.joinRoomContainer}>
        <JoinRoom username={username} socket={socket} />
      </div>
    </div>
  );
};

export default Home;
