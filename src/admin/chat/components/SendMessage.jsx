import { sendMessage } from "../utils/chatApi";
import { useContext, useState } from "react";
import MessageContext from "../context/MessageContext";
import { Socketcontext } from "../context/SocketContext";
import { IoSend } from "react-icons/io5";
const SendMessage = () => {
  const [sentMessage, setSentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setMessages } = useContext(MessageContext);
  const { currentFriendId } = useContext(Socketcontext);
  const handleClick = async () => {
    console.log("clicked");
    if (sentMessage === "" || currentFriendId === null) {
      // stop request
      return;
    }
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(sendMessage + currentFriendId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message: sentMessage }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const responseData = await response.json();
        console.log("Message sent data:", responseData);
        setSentMessage("");
        setMessages((prevMessages) => [...prevMessages, responseData.data]);
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex h-[10%] justify-between border border-solid bg-blue-900 text-white">
      <input
        type="text"
        placeholder=" Sent message..."
        className="px-4 h-full w-[80%] outline-none bg-blue-900 placeholder:text-white"
        value={sentMessage}
        onChange={(e) => setSentMessage(e.target.value)}
      />
      <div>
        <button
          className=" mx-4 my-2 rounded-sm bg-blue-900 px-2 py-1 text-white"
          onClick={handleClick}
        >
          {isLoading ? "Sending..." : <IoSend className="h-8 w-8 bg-blue-900 " />}
        </button>
      </div>
    </div>
  );
};
export default SendMessage;
