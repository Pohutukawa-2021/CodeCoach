const { getUserData } = require("../../db/users");
const { getDMTo, getDMFrom } = require("../../db/messages");

module.exports = getDirectMessages;

function getDirectMessages(socket) {
  getUserData(socket.decoded_token.sub)
    .then((data) => {
      userId = data[0].id;
      let directMessagesTo = {};
      let directMessagesFrom = {};
      getDMTo(userId)
        .then((data) => {
          data.forEach((msg) => {
            if (directMessagesTo[msg.from] === undefined) {
              directMessagesTo[msg.from] = [{ ...msg }];
            } else {
              directMessagesTo[msg.from] = [
                ...directMessagesTo[msg.from],
                { ...msg },
              ];
            }
          });
          getDMFrom(userId).then((data) => {
            data.forEach((msg) => {
              if (directMessagesFrom[msg.to] === undefined) {
                directMessagesFrom[msg.to] = [{ ...msg }];
              } else {
                directMessagesFrom[msg.to] = [
                  ...directMessagesFrom[msg.to],
                  { ...msg },
                ];
              }
            });
            let convos = {};
            let toKeys = Object.keys(directMessagesTo);
            let fromKeys = Object.keys(directMessagesFrom);
            toKeys.forEach((key) => {
              convos[key] = directMessagesTo[key];
            });
            fromKeys.forEach((key) => {
              if (convos[key] == undefined) {
                convos[key] = directMessagesFrom[key];
              } else {
                convos[key] = [...convos[key], ...directMessagesFrom[key]];
              }
            });
            for (const [key, value] of Object.entries(convos)) {
              value.sort((a, b) => {
                return a.date - b.date;
              });
            }
            socket.emit("action", { type: "setMessages", data: convos });
          });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => {
      console.log(err);
    });
}
