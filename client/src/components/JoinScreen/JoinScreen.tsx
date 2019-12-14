import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Props {}

const JoinScreen: React.FC<Props> = () => {
  const [name, setName] = useState<string | string[]>("");
  const [room, setRoom] = useState<string | string[]>("");

  return (
    <div className="joinScreenOuterContainer">
      <div className="joinScreenInnerContainer">
        <h1 className="heading">Let's Chat</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="screenInput"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="screenInput mt-20"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={event => (!name || !room ? event.preventDefault() : null)}
        >
          <button className="signInButton mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinScreen;
