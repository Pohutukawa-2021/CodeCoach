const { addMessage } = require("../../db/messages");
const { v4: uuidv4 } = require("uuid");

module.exports = sendMessage;

function sendMessage(io, socket, action, users) {
  addMessage(action)
    .then(() => {
      ("message added");
    })
    .catch((err) => {
      err.message;
    });
  const conversationId = action.data.from;
  const toUserId = action.data.to;
  if (conversationId == toUserId) {
    return;
  }
  const usersList = Object.values(users);
  const socketIds = Object.keys(users);
  const messageToDispatch = {
    ...action.data,
    to: conversationId,
    message_id: uuidv4(),
  };
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].id == toUserId) {
      const socketId = socketIds[i];
      io.to(socketId).emit("action", {
        type: "setNewMessage",
        data: messageToDispatch,
      });
      break;
    }
  }
}
