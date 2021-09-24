import { ChatFeed, Message } from "react-chat-ui";
import { useState } from "react";

function ChatComponent() {
  const [userText, setUserText] = useState("");

  const [messages, setMessages] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
  ]);

  function sendMessage(e) {
    e.preventDefault();
    setMessages([...messages, new Message({ id: 0, message: userText })]);
    setUserText("");
  }

  console.log("chat is rendered");
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
      <button onClick={(e) => sendMessage(e)}>Send</button>
    </div>
  );
}

export default ChatComponent;
