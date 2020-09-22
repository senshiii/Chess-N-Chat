import React, { createContext, useEffect, useState } from 'react';

export const SocketContext = createContext({
	socket: null,
	setSocket: () => {}
});

export default (props) => {
	const [ socket, setSocket ] = useState();

	useEffect(
		() => {
			if (socket) {
				// DEFINE SOCKET EVENTS HERE
				console.log(socket.id);
				socket.on('JOIN-ROOM', (msg) => console.log(msg));
			} else {
				console.log('COULD NOT FIND SOCKET');
			}
		},
		[ socket ]
	);

	return (
		<SocketContext.Provider
			value={{
				socket,
				setSocket
			}}
		>
			{props.children}
		</SocketContext.Provider>
	);
};
