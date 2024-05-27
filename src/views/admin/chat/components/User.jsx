import johncena from "../assets/johncena.jpeg";
import { useContext } from "react";
import MessageContex from "../context/MessageContext";
import { Socketcontext } from "../context/SocketContext";
import { getOneUserConversation } from "../utils/chatApi";
const User = ({ fullname, id }) => {
  const { setMessages } = useContext(MessageContex);
  const { currentFriendId, setCurrentFriendId, setUnreadMessages } =
    useContext(Socketcontext);

  // console.log(currentFriendId)
  const handleClick = () => {
    if (currentFriendId === id) return;
    const caller = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(getOneUserConversation + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const responseData = await response.json();
          setMessages(responseData.data);
          setCurrentFriendId(id);
          setUnreadMessages((prevUnreadMessages) => {
            return prevUnreadMessages.filter((userId) => userId !== id);
          });
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    caller();
  };
  return (
    <div
      className="h-16 py-2 transform flex-col shadow-md transition duration-300 ease-in-out hover:bg-gray-200"
      onClick={handleClick}
    >
      <div className="flex items-center px-2">
        <img src={johncena} alt="profile pic" className="h-10 w-10 rounded-full " />
        <p className="px-4 font-semibold">{fullname}</p>
      </div>
    </div>
  );
};
const highlightUser = (WrappedComponent) => {
  // Returns a component
  return ({ fullname, id }) => {
    return (
      <div className="rounded border border-blue-500 p-2">
        <WrappedComponent fullname={fullname} id={id} />
      </div>
    );
  };
};
export { highlightUser };
export default User;
