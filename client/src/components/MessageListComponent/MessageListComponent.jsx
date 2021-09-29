import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    const arrayOfLastMessage = peopleInConversationWithId.map((key) => {
      const userDetails = getUserDetailsById(key);
      const lastMessage = getLatestMessageForUser(key);
      return {
        userDetailsId: userDetails.id,
        userDetailsImage: userDetails.image_url,
        userDetailsUsername: userDetails.username,
        userLastMessage: lastMessage.message,
        messageDateSent: lastMessage.date,
      };
    });
    const sortedArray = arrayOfLastMessage.sort(
      (a, b) => b.messageDateSent - a.messageDateSent
    );

    return sortedArray.map((msg) => {
      return (
<<<<<<< HEAD:client/src/components/MessageListComponent.jsx
        <div key={uuidv4()}>
          <Link to={`/app/messaging/${msg.userDetailsId}`} className="chats-list-item">
            <img src={msg.userDetailsImage} alt={msg.userDetailsUsername} className="chats-list-avatar"/>            
            <div className="chats-list-details">
              <p className="chats-list-username">{msg.userDetailsUsername}</p>
              <p className="chats-list-message">{msg.userLastMessage}</p>
            </div>
=======
        <li key={uuidv4()}>
          <Link to={`/app/messaging/${msg.userDetailsId}`}>
            <img src={msg.userDetailsImage} alt={msg.userDetailsUsername} />
            <p>{msg.userLastMessage}</p>
>>>>>>> 79f2565f318cb9d7c1982834f8bd06846670262d:client/src/components/MessageListComponent/MessageListComponent.jsx
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
