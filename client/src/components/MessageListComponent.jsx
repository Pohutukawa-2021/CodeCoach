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
        <li>
          <Link to={`/app/messaging/${userDetails.id}`}>
            <img src={userDetails.image_url} alt={userDetails.username} />
            <p>{lastMessage.message}</p>
          </Link>
        </li>
      );
    });
  }

  const messageList = getUsersInConversationWith();
  return (
    <div>
      <h1>Chat</h1>
      <ul>{messageList}</ul>
    </div>
  );
}

export default MessageListComponent;
