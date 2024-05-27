import Messages from "./Messages";
import SendMessage from "./SendMessage";
import MessageNavBar from "./MessageNavBar";
import { useContext } from "react";
import { Socketcontext } from "../context/SocketContext.js";
const Chat = () => {
  const { currentFriendId } = useContext(Socketcontext);
  return (
    <div className="w-8/12 rounded-tr-md rounded-br-md bg-blue-200">
      <MessageNavBar />
      <Messages />
      {currentFriendId === null ? <></> : <SendMessage />}
    </div>
  );
};
export default Chat;
