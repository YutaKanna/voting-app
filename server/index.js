const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});

let voteCounts = {};

io.on("connection", (socket) => {
  socket.emit("voteCounts", voteCounts);

  socket.on("vote", (optionId) => {
    if (voteCounts[optionId]) {
      voteCounts[optionId]++;
    } else {
      voteCounts[optionId] = 1;
    }

    io.emit("voteCounts", voteCounts);
  });
});

server.listen(3000, () => {
  console.log("サーバーがポート3000で起動しました。");
});
