const { addMessage } = require("../../db/messages");

module.exports = sendMessage;

function sendMessage(io, socket, action, users) {
  addMessage(action)
    .then(() => {
      console.log("message added");
    })
    .catch((err) => {
      console.log(err.message);
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
