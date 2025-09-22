const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all clients for testing
    methods: ["GET", "POST"]
  }
});

// Use PORT from environment (Railway sets this automatically)
const PORT = process.env.PORT || 3000;

// Optional: simple route to test server
app.get("/", (req, res) => {
  res.send("Socket.IO server is running!");
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("mini-chat", (msg) => {
    console.log("mini-chat received:", msg);
    io.emit("mini-chat", msg); // broadcast
  });

  socket.on("test", (msg) => {
    console.log("📩 Got test:", msg);
    socket.emit("testResponse", "Hello from server");
  });

  socket.on("pingTest", (msg) => {
    console.log("Got ping:", msg);
    socket.emit("pongTest", "Hello from server");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running at http://0.0.0.0:${PORT}`);
});

// const express = require("express");

// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // allow all clients for testing
//     methods: ["GET", "POST"]
//   }
// });

// const PORT = 3000;


// // Handle client connections
// io.on("connection", (socket) => {
//   console.log("a user connected:", socket.id);

//   // Example: listen to mini-chat
//   socket.on("mini-chat", (msg) => {
//     console.log("mini-chat received:", msg);
//     // broadcast to all clients
//     io.emit("mini-chat", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected:", socket.id);
//   });

//   socket.on("test", (msg) => {
//     console.log("📩 Got test:", msg);
//     socket.emit("testResponse", "Hello from server");
//   });

//   socket.on("pingTest", (msg) => {
//     console.log("Got ping:", msg);
//     socket.emit("pongTest", "Hello from server");
// });
// });

// // Start server
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`Socket.IO server running at http://0.0.0.0:${PORT}`);
// });