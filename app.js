const express = require("express");
const socketio = require("socket.io");

require("dotenv").config();

// Set my express app
const app = express();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`Server started on PORT: ${PORT}`)
);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log('Rooms: ', io.sockets.adapter.rooms);
  console.log("Somebody connected");
  socket.on("JOIN-ROOM", (roomId) => {
    console.log(`SOMEBODY JOINED THE ROOM: ${roomId}`);
    socket.join(roomId);
    socket.to(roomId).emit("JOIN-ROOM-SUCCESS", `Somebody Joined the room.`);
    console.log(socket.id);
    console.log(`Number of members in Room: ${roomId} is ${io.sockets.adapter.rooms[roomId].length}`);
  });
  socket.on("disconnect", () => {
    console.log("Somebody disconnected");
    console.log('Rooms: ', io.sockets.adapter.rooms);
  });
});
