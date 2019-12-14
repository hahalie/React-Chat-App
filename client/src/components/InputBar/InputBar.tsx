import React from "react";

import "./InputBar.css";

interface Props {
  message: string;
  setMessage: Function;
  sendMessage: Function;
}

const InputBar: React.FC<Props> = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder="Type a message..."
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={event => sendMessage(event)}>
        Send
      </button>
    </form>
  );
};

export default InputBar;
