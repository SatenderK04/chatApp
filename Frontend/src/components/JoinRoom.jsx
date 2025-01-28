import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import styles from "../CSS/HomePage.module.css";

const JoinRoom = ({ username }) => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Validate the input
    if (/^[A-Za-z0-9]{0,6}$/.test(value)) {
      setRoomCode(value);
      setError("");
    } else {
      setError("Room code must be 6 alphanumeric characters only.");
    }
  };

  const handleJoinRoom = () => {
    if (roomCode.length !== 6) {
      setError("Room code must have exactly 6 characters !");
    } else {
      setError("");

      if (roomCode.trim() !== "") {
        socket.emit("join_room", { username, room: roomCode });
        localStorage.setItem("room", roomCode);
        console.log(`Joined room ${roomCode}`);

        navigate("/chat", { state: { username, room: roomCode } });
      } else {
        setError("Please enter a valid Room Code.");
      }
    }
  };

  return (
    <div className={styles.joinRoomContainer}>
      <input
        className={styles.inputRoom}
        placeholder="Room Code: 6 Characters"
        onChange={handleInputChange}
        value={roomCode}
        maxLength={6}
      />
      <button onClick={handleJoinRoom} className={styles.joinRoomButton}>
        Join
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default JoinRoom;
