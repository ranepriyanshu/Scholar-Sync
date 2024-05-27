import React, { useRef, useEffect, useContext } from 'react';
import Message from './Message';
import MessageContext from "../context/MessageContext"
const MessageList = () => {
    const messageListRef = useRef(null);
    const {messages} = useContext(MessageContext);
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    useEffect(() => {
        // Scroll to the bottom of the message list
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="h-[90%] overflow-y-auto border-b-gray-800" ref={messageListRef}>
            {
                // add unqiue message id at backend
                messages.map((message,index)=>{
                        return (
                            message.senderId===userData.data.User._id
                            ?<div className="flex justify-end" key={index}>
                                <Message message={message.message}/>
                            </div>
                            :<div className="flex justify-start" key={index} >
                                <Message message={message.message}/>
                            </div>
                        )
                })
            }
        </div>
        );
};

export default MessageList;
