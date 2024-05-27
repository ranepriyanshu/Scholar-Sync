import { getAllUserData } from "../utils/chatApi.js";
import { useEffect, useContext, useState } from "react";
import User from "./User.jsx";
import { Socketcontext } from "../context/SocketContext.js";
import { highlightUser } from "./User.jsx";
const ChatMenu = ({ userName }) => {
  const { unreadMessages } = useContext(Socketcontext);
  const [friends, setFriends] = useState([]);
  const UserhasMessaged = highlightUser(User);
  useEffect(() => {
    const loadChat = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(getAllUserData, {
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
          setFriends(responseData.data);
        }
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };
    loadChat();
  }, []);
  return (
    <div className="max-h-80 overflow-y-auto">
      {userName === ""
        ? friends.map((friend) => (
            <div key={friend._id}>
              {unreadMessages.includes(friend._id) ? (
                <UserhasMessaged fullname={friend.fullName} id={friend._id} />
              ) : (
                <User fullname={friend.fullName} id={friend._id} />
              )}
            </div>
          ))
        : friends
            .filter((friend) =>
              friend.fullName.toLowerCase().includes(userName.toLowerCase())
            )
            .map((friend) => (
              <div key={friend._id}>
                {unreadMessages.includes(friend._id) ? (
                  <UserhasMessaged fullname={friend.fullName} id={friend._id} />
                ) : (
                  <User fullname={friend.fullName} id={friend._id} />
                )}
              </div>
            ))}
    </div>
  );
};
export default ChatMenu;
