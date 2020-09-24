import React, { createContext, useEffect, useState } from 'react';

export const SocketContext = createContext({
	socket: null,
	roomId: '',
	setRoomd: () => {},
	setSocket: () => {},
	msg: '',
	setMsg: () => {},
	name: '',
	setName: () => {},
	actions: {}
});

export default (props) => {
	const [ socket, setSocket ] = useState();
	const [ roomId, setRoomId ] = useState('');
	const [ msg, setMsg ] = useState('');
  const [name, setName] = useState('');

	useEffect(
		() => {
			if (socket) {
				// DEFINE SOCKET EVENTS HERE
        console.log(socket);
				socket.on('JOIN-ROOM-SUCCESS', (msg) => {
					console.log(msg);
					setMsg(msg);
				});
			} else {
				console.log('COULD NOT FIND SOCKET');
			}
			// LEAVE ROOM AND DISCONNECTION HANDLING
		},
		[ socket ]
	);

	const joinRoom = () => socket.emit('JOIN-ROOM', { roomId, name });

	return (
		<SocketContext.Provider
			value={{
				socket,
				roomId,
				setRoomId,
				setSocket,
				msg,
				setMsg,
				name,
				setName,
				events: {
					joinRoom
				}
			}}
		>
			{props.children}
		</SocketContext.Provider>
	);
};
