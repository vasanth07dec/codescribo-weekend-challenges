const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

//Creates an HTTP server explicitly for WebSocket bind.
const server = http.createServer(app);

// binds the Socket.IO server to the HTTP server, enabling WebSocket support alongside HTTP routes
const io = new Server(server, {
  cors: {
    // In default socket server set same origin for connection
    // you haven't use same origin need to give your origin
    origin: "http://localhost:5173",
    methods: ["GET"],
  },
});

const users = {};
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register_user", (userId) => {
    // Remove any previous socket ID for the same user id
    Object.keys(users).forEach((socketId) => {
      if (users[socketId] === userId) {
        delete users[socketId];
      }
    });

    // Map the username to the latest socket ID
    users[socket.id] = userId;
    console.log(users, socket.id, "users");
  });

  socket.on("send_message", (data) => {
    console.log(data, "send_message");
    const { senderId, receiverId, message, time } = data;

    const receiverSocketId = Object.keys(users).find(
      (id) => users[id] === receiverId
    );

    if (receiverSocketId) {
      console.log("ready for send");
      io.to(receiverSocketId).emit("receive_message", {
        senderId,
        message,
        time,
      });
    }
    console.log(receiverSocketId, "receiverSocketId");
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
