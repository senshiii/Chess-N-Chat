import React, { createContext, useEffect, useState } from "react";

export const SocketContext = createContext({
  socket: null,
  roomId: "",
  setRoomd: () => {},
  setSocket: () => {},
  info: "",
  setInfo: () => {},
  name: "",
  setName: () => {},
  actions: {},
	msgs: [],
	match: '',
});

export default (props) => {
  const [socket, setSocket] = useState();
  const [roomId, setRoomId] = useState("");
  const [info, setInfo] = useState("");
  const [name, setName] = useState("");
  const [msgs, setMessages] = useState([]);

  const setMsgs = (msg, sender = name) => {
    const messages = msgs.map((el) => Object.assign({}, el));
    messages.push({ sender, msg });
    console.log("New Chat Messages: ", messages);
    setMessages(messages);
  };

  const listenForEvents = () => {
    // EVENT : ROOM JOINING SUCCESS
    socket.on("JOIN-ROOM-SUCCESS", (msg) => {
      console.log(msg);
      setInfo(msg);
    });
    // EVENT : RECEIEVE MESSAGE
    socket.on("RECEIVE-MSG", ({ msg, sender }) => {
      console.log("Previous Chat Messages:", msgs);
      console.log(msg);
      setMsgs(msg, sender);
    });
  };

  useEffect(() => {
    if (socket) {
      // DEFINE SOCKET EVENTS HERE
      console.log(socket);
      listenForEvents();
    } else {
      console.log("COULD NOT FIND SOCKET");
    }
    // LEAVE ROOM AND DISCONNECTION HANDLING
  }, [socket, listenForEvents]);

  const joinRoom = () => socket.emit("JOIN-ROOM", { roomId, name });

  const sendMessage = (msg) => {
    socket.emit("SEND-MSG", { roomId, sender: name, msg });
    setMsgs(msg);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomId,
        setRoomId,
        setSocket,
        info,
        setInfo,
        name,
        setName,
        msgs,
        events: {
          joinRoom,
          sendMessage,
        },
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
