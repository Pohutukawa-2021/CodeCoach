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

    // return sortedArray.map((msg) => {
    //   return (
    //     <li key={uuidv4()}>
    //       <Link to={/app/messaging/${msg.userDetailsId}}>
    //         <img src={msg.userDetailsImage} alt={msg.userDetailsUsername} />
    //         <p>{msg.userLastMessage}</p>
    //       </Link>
    //     </li>
    //   );
    // });

    return sortedArray.map((msg) => {
      return (
        <div key={uuidv4()} className="chats-list-item">
          <Link to={`/app/messaging/${msg.userDetailsId}`}>
            <img src={msg.userDetailsImage} alt={msg.userDetailsUsername} className="chats-list-avatar"/>
            <div className="chats-list-details">
              <p className="chats-list-username">{msg.userDetailsUsername}</p>
              <p className="chats-list-message">{msg.userLastMessage}</p>
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
