import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const JoinRoom = ({ username }) => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomCode.trim() !== "") {
      socket.emit("join_room", { username, room: roomCode });
      localStorage.setItem("room", roomCode);
      console.log(`Joined room ${roomCode}`);

      // Pass data through navigation state
      navigate("/chat", { state: { username, room: roomCode } });
    } else {
      console.log("Please Enter a Valid Room Code");
    }
  };
  return (
    <div>
      <input
        placeholder="Room Code"
        onChange={(e) => {
          setRoomCode(e.target.value);
        }}
        value={roomCode}
      />
      <button onClick={handleJoinRoom}>Join</button>
      {/* {roomCode && <Chat username={username} room={roomCode} socket={socket} />} */}
    </div>
  );
};

export default JoinRoom;
