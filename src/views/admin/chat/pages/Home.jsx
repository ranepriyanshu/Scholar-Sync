import SideBar from "../components/SideBar";
import Chat from "../components/Chat";
import MessageContext from "../context/MessageContext";
import { useState, useEffect, useContext } from "react";
import { Socketcontext } from "../context/SocketContext";
import io from "socket.io-client";
import { connectSocket } from "../utils/chatApi";
import notificationSound from "../assets/Sounds/oi_you_have_a_text.mp3";

const Home = () => {
  const { socket, setSocket, setUnreadMessages, currentFriendId } =
    useContext(Socketcontext);
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  // message context
  const [messages, setMessages] = useState([]);
  const [clicked, setClicked] = useState("");

  useEffect(() => {
    if (!socket) {
      setSocket(io(connectSocket + userData?.data?.User?._id));
    } else {
      // Event listener for incoming messages
      socket.on("newMessage", (data) => {
        // Check if the message is from the currently selected friend
        if (data.senderId !== currentFriendId) {
          console.log("Message Stored");
          console.log("In socket ", data.senderId, currentFriendId);
          console.log(data.message);

          const audio = new Audio(notificationSound);
          audio.play();

          // Update the list of unread messages if the sender is not the current friend
          setUnreadMessages((prevUnreadMessages) => {
            if (!prevUnreadMessages.includes(data.senderId)) {
              return [...prevUnreadMessages, data.senderId];
            }
            return prevUnreadMessages;
          });
        } else {
          console.log("Message Came");
          console.log("In socket ", data.senderId, currentFriendId);
          console.log(data.message);
          setMessages([...messages, data]);
        }
      });
    }
  }, [socket, currentFriendId]);

  if (!userDataString) {
    return <>Scholar Chat</>;
  }
  return (
    <MessageContext.Provider
      value={{ messages, setMessages, clicked, setClicked }}
    >
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex h-[80%] w-4/5 rounded-md ">
          <SideBar />
          <Chat />
        </div>
      </div>
    </MessageContext.Provider>
  );
};

export default Home;
