import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MessageListComponent() {
  const allUsers = useSelector((state) => state.users);
  const directMessages = useSelector((state) => state.messages);

  function getUserDetailsById(userId) {
    return allUsers.find((user) => user.id === parseInt(userId));
  }

  function getLatestMessageForUser(userId) {
    return directMessages[userId][directMessages[userId].length - 1];
  }

  function getUsersInConversationWith() {
    const peopleInConversationWithId = Object.keys(directMessages);
    return peopleInConversationWithId.map((key) => {
      const userDetails = getUserDetailsById(key);
      const lastMessage = getLatestMessageForUser(key);
      return (
        <div className="chats-list-item">
          <Link to={`/app/messaging/${userDetails.id}`}>
            <img src={userDetails.image_url} alt={userDetails.username} className="chats-list-avatar"/>
            <div className="chats-list-details">
              <p className="chats-list-username">{userDetails.username}</p>
              <p className="chats-list-message">{lastMessage.message}</p>
            </div>
          </Link>
        </div>
      );
    });
  }

  const messageList = getUsersInConversationWith();
  return (
    <div className="layout-left-col">
      <h1 classname="left-col-title">Chats</h1>
      <div className="chats-list">{messageList}</div>
    </div>
  );
}

export default MessageListComponent;
