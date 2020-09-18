const express = require('express');
const socketio = require('socket.io');

require('dotenv').config();

// Set my express app
const app = express();

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));

const io = socketio(server);

io.on('connection', socket => {
  console.log(socket.id);
})
