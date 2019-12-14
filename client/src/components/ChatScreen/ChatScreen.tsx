import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { RouteComponentProps } from "react-router-dom";

interface Props {}

let socket: any;

const ChatScreen: React.FC<Props> = ({ location }: RouteComponentProps) => {
  const [name, setName] = useState<string | string[]>("");
  const [room, setRoom] = useState<string | string[]>("");

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


  return (
    <div className="chatScreenOuterContainer">
      <div className="chatScreenInnerContainer">
        This is {name}'s Chat Screen in room #{room}
      </div>
    </div>
  );
};

export default ChatScreen;
