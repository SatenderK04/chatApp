import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);

const users = [];
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // backend can get request from 5173 as react server is active on 5173
    methods: ["GET", "POST"],
  },
});

// Database Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/chatApp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);

io.on("connection", (socket) => {
  // console.log("socket ID: ", socket.id);

  socket.on("join_room", ({ username, room }) => {
    socket.join(room);

    users.push({ socketId: socket.id, username, room });

    console.log(`User with ID: ${socket.id} joined room: ${room}`);
    console.log("Total users: ", users.length);

    // Emit updated user list to everyone in the room
    io.to(room).emit(
      "user_list",
      users.filter((user) => user.room === room)
    );
  });

  socket.on("leave_room", ({ username, room }) => {
    const index = users.findIndex((user) => user.socketId === socket.id);
    if (index !== -1) {
      users.splice(index, 1); // Remove user from the list
      socket.leave(room);

      io.to(room).emit(
        "user_list",
        users.filter((user) => user.room === room)
      );
    }
    console.log(`${username} has left room: ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", ({ room, username }) => {
    socket.to(room).emit("display_typing", { username });
  });

  socket.on("stop_typing", (room) => {
    socket.to(room).emit("stop_typing");
  });

  socket.on("disconnect", () => {
    const index = users.findIndex((user) => user.socketId === socket.id);
    if (index !== -1) {
      const user = users[index];
      users.splice(index, 1);
      io.to(user.room).emit(
        "user_list",
        users.filter((user) => user.room === user.room)
      );
    }

    console.log("user disconnected: ", socket.id);
    console.log(users);
  });
});

// Start Server
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
