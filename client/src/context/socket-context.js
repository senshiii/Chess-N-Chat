import React, { createContext, useEffect, useState } from "react";

export const SocketContext = createContext({
  socket: null,
  roomId: "",
  setSocket: () => {},
  msg: "",
  setMsg: () => {},
});

export default (props) => {
  const [socket, setSocket] = useState();
  const [roomId, setRoomId] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (socket && roomId) {
      // DEFINE SOCKET EVENTS HERE
      console.log(socket);
      socket.emit("JOIN-ROOM", roomId);

      socket.on("JOIN-ROOM-SUCCESS", (msg) => {
				
				console.log(msg);
        setMsg(msg);
			});
			

    } else {
      console.log("COULD NOT FIND SOCKET");
    }
    // LEAVE ROOM AND DISCONNECTION HANDLING
  }, [socket, roomId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        setRoomId,
        setSocket,
        msg,
        setMsg,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
