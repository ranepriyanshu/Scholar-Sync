import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Error from "./components/Error.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Socketcontext } from "./context/SocketContext.js";
function ChatApp() {
  // socket context
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  return (
    <>
      <Socketcontext.Provider
        value={{
          socket,
          setSocket,
          unreadMessages,
          setUnreadMessages,
          currentFriendId,
          setCurrentFriendId,
        }}
      >
        <Home />
      </Socketcontext.Provider>
    </>
  );
}

export default ChatApp;
