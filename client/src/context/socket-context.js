import React, { createContext, useEffect, useState } from "react";

export const SocketContext = createContext({
  socket: null,
});

export default (props) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (socket) {
      // DEFINE SOCKET EVENTS HERE
    }
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
      }}
    ></SocketContext.Provider>
  );
};
