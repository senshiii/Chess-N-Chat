const express = require('express');
const socketio = require('socket.io');

require('dotenv').config();

// Set my express app
const app = express();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

const io = socketio(server);

io.on('connection', (socket) => {
	// console.log('Rooms: ', io.sockets.adapter.rooms);
	console.log('Somebody connected');
	socket.on('JOIN-ROOM', (user) => {
    console.log(`${socket.id} JOINED THE ROOM: ${user.roomId}`);
		console.log(`Number of members in Room: ${user.roomId} is ${io.sockets.adapter.rooms[user.roomId].length}`);
		socket.join(user.roomId);
		socket.to(user.roomId).emit('JOIN-ROOM-SUCCESS', `${user.name} Joined the room.`);
	});
	socket.on('disconnect', () => {
		console.log('Somebody disconnected');
		console.log('Rooms: ', io.sockets.adapter.rooms);
	});
});
