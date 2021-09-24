import { ChatFeed, Message } from "react-chat-ui";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDirectMessages } from "../redux/actions/messages";

function ChatComponent() {
  const [userText, setUserText] = useState("");
  const dispatch = useDispatch();
  const directMessages = useSelector((state) => state.directMessage);
  const userId = useSelector((state) => state.userAccount.id);
  const { id } = useParams();

  // function sendMessage(e) {
  //   e.preventDefault();
  //   setMessages([...messages, new Message({ id: 0, message: userText })]);
  //   setUserText("");
  // }

  useEffect(() => {
    dispatch(getDirectMessages(id));
  }, [id]);

  const messages = directMessages.map((msg) => {
    if (msg.from == userId) {
      msg.id = 0;
    }
    return new Message({
      id: msg.id,
      message: msg.message,
    });
  });

  console.log(directMessages);
  console.log(userId);
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
