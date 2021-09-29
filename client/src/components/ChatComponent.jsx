import { ChatFeed, Message } from "react-chat-ui";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { PaperPlane } from 'react-ionicons'

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
    <div className="layout-center-col">
      <div className="chat-layout-container">
        <div className="chat-container">
          <ChatFeed
            messages={messages}
            showSenderName
            bubblesCentered={false}
            bubbleStyles={{
              text: {
                fontSize: 16,
                color: "#F4F6F7",
                textAlign: "center",
              },
              chatbubble: {
                backgroundColor: "#12558A",
                borderRadius: 150,
                padding: 12,
                margin: 4,
              },
            }}
          />
          <div className="chat-input-container">
            <input
              onKeyDown={(e) => onEnter(e)}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="chat-input"
              required
            />
            <button className="chat-button" onClick={() => sendMessage()}>
              <PaperPlane
                color={'#80BEEC'} 
                title={"send-message"}
                height="38px"
                width="38px"
                className="chat-button-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
