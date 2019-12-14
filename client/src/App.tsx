import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components
import JoinScreen from "./components/JoinScreen/JoinScreen";
import ChatScreen from "./components/ChatScreen/ChatScreen";


const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={JoinScreen} />
      <Route path="/chat" component={ChatScreen} />
    </Router>
  );
};

export default App;
