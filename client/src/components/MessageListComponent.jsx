import React from "react";
import { useSelector } from "react-redux";

function MessageListComponent() {
  const allUsers = useSelector((state) => state.users);
  const directMessages = useSelector((state) => state.messages);

  function getUsersInConversationWith() {
    for (const [key, value] of Object.entries(directMessages)) {
      console.log(key, value);
    }
  }

  console.log(directMessages);
  return (
    <div>
      <h1>Message Component</h1>
    </div>
  );
}

export default MessageListComponent;
