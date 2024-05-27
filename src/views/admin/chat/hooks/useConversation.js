import { useState } from "react";
import { getOneUserConversation } from "../utils/chatApi";

const useConversation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConversation = async (id, setMessages, setCurrentFriendId) => {
    try {
      setLoading(true);
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
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchConversation };
};

export default useConversation;
