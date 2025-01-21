// import { useState, useEffect } from "react";
// import "./App.css";
// import io from "socket.io-client";
// import Chat from "./assets/components/Chat";
// import UserList from "./assets/components/UserList";

// const socket = io.connect("http://localhost:8000");

// function App() {
//   const [username, setUsername] = useState("");
//   const [room, setRoom] = useState("");
//   const [showChat, setShowChat] = useState(false);
//   const [usersList, setTotalUsers] = useState([]);

//   useEffect(() => {
//     socket.on("user_list", (users) => {
//       setTotalUsers(users);
//     });

//     return () => {
//       socket.off("user_list");
//     };
//   }, []);

//   const joinRoom = () => {
//     if (username !== "" && room !== "") {
//       socket.emit("join_room", { username, room });
//       setShowChat(true);
//     }
//   };

//   return (
//     <div className="app-container">
//       {!showChat ? (
//         <div className="app">
//           <h2>Join A Chat</h2>
//           <input
//             type="text"
//             placeholder="User"
//             onChange={(event) => {
//               setUsername(event.target.value);
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Room ID"
//             onChange={(event) => {
//               setRoom(event.target.value);
//             }}
//           />
//           <button onClick={joinRoom}>Join</button>
//         </div>
//       ) : (
//         <>
//           <UserList usersList={usersList} />
//           <Chat
//             socket={socket}
//             room={room}
//             username={username}
//             setTotalUsers={setTotalUsers}
//             setShowChat={setShowChat}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "D:/CS/Web/BCK/ChatApp/Frontend/pages/login.jsx";
import Home from "D:/CS/Web/BCK/ChatApp/Frontend/pages/home.jsx";
import ProtectedRoute from "./assets/components/protectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
