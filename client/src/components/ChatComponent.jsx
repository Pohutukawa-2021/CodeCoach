import { ChatFeed, Message } from "react-chat-ui";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function ChatComponent() {
  const [userText, setUserText] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userAccount.id);
  const { id } = useParams();
  const directMessages = useSelector((state) => state.messages[id]);

  // function sendMessage(e) {
  //   e.preventDefault();
  //   setMessages([...messages, new Message({ id: 0, message: userText })]);
  //   setUserText("");
  // }

  function setMessages() {
    if (directMessages != undefined) {
      return directMessages.map((msg) => {
        if (msg.from === userId) {
          msg.id = 0;
        }
        return new Message({
          id: msg.id,
          message: msg.message,
        });
      });
    }
    return [];
  }

  const messages = setMessages();

  console.log(directMessages);
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
      <input value={userText} onChange={(e) => setUserText(e.target.value)} />
      <button>Send</button>
    </div>
  );
}

export default ChatComponent;
