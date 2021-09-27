import { ChatFeed, Message } from "react-chat-ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

function ChatComponent() {
  const [userText, setUserText] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userAccount.id);
  const { id } = useParams();
  const directMessages = useSelector((state) => state.messages[id]);

  function sendMessage() {
    dispatch({
      type: "setNewMessage",
      data: {
        message_id: uuidv4(),
        from: userId,
        to: id,
        date: Date.now(),
        time: Date.now(),
        message: userText,
      },
    });
    dispatch({
      type: "server/sendMessage",
      data: {
        from: userId + "",
        to: id,
        date: Date.now(),
        time: Date.now(),
        message: userText,
      },
    });
    setUserText("");
  }

  function onEnter(e) {
    if (e.keyCode === 13 && userText !== "") {
      sendMessage();
    }
  }

  function setMessages() {
    if (directMessages !== undefined) {
      let messageIds = [
        ...new Set(directMessages.map((message) => message.message_id)),
      ];
      let result = messageIds.map((msgId) => {
        let msg = directMessages.find(
          (message) => message.message_id === msgId
        );
        if (msg.from === userId) {
          msg.from = 0;
        }
        return new Message({
          id: msg.from,
          message: msg.message,
        });
      });
      return result;
    }
    return [];
  }

  const messages = setMessages();
  return (
    <div className="chat">
      <ChatFeed
        messages={messages}
        showSenderName
        bubblesCentered={false}
        bubbleStyles={{
          text: {
            fontSize: 30,
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40,
          },
        }}
      />
      <input
        onKeyDown={(e) => onEnter(e)}
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
}

export default ChatComponent;
