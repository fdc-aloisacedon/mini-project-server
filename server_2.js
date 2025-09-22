const express = require("express");
const socket = require("socket.io");
const fs = require("fs");
const app = express();
var PORT = 3000;

const server = app.listen(PORT)

app.use(express.static("public"));

console.log("Server running on port " + PORT);

const io = socket(server)

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  // Example: listen to mini-chat
  socket.on("mini-chat", (msg) => {
    console.log("mini-chat received:", msg);
    // broadcast to all clients
    io.emit("mini-chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });

  socket.on("test", (msg) => {
    console.log("📩 Got test:", msg);
    socket.emit("testResponse", "Hello from server");
  });
});