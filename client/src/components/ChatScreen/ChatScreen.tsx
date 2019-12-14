import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { RouteComponentProps } from "react-router-dom";

import Status from "../Status/Status";
import InputBar from "../InputBar/InputBar";
import Messages from "../Messages/Messages";

import './ChatScreen.css'

interface Props {}

let socket: any;

const ChatScreen: React.FC<Props> = ({ location }: RouteComponentProps) => {
  const [name, setName] = useState<string | string[]>("");
  const [room, setRoom] = useState<string | string[]>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const ENDPOINT: string = "localhost:5000";

  useEffect(() => {
    const { name, room }: queryString.ParsedQuery<string> = queryString.parse(
      location.search
    );

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="chatScreenOuterContainer">
      <div className="chatScreenInnerContainer">
      <Status room={room} />
        <Messages messages={messages} name={name} />
        <InputBar
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatScreen;
