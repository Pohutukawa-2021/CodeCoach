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
              directMessagesTo[msg.from] = {
                email: msg.email,
                username: msg.username,
                imageUrl: msg.image_url,
                conversation: [
                  {
                    id: msg.id,
                    message_id: msg.message_id,
                    to: msg.to,
                    from: msg.from,
                    message: msg.message,
                    date: msg.date,
                    time: msg.time,
                  },
                ],
              };
            } else {
              directMessagesTo[msg.from] = {
                ...directMessagesTo[msg.from],
                conversation: [
                  ...directMessagesTo[msg.from].conversation,
                  {
                    id: msg.id,
                    message_id: msg.message_id,
                    to: msg.to,
                    from: msg.from,
                    message: msg.message,
                    date: msg.date,
                    time: msg.time,
                  },
                ],
              };
            }
          });
          getDMFrom(userId).then((data) => {
            data.forEach((msg) => {
              if (directMessagesFrom[msg.to] === undefined) {
                directMessagesFrom[msg.to] = {
                  email: msg.email,
                  username: msg.username,
                  imageUrl: msg.image_url,
                  conversation: [
                    {
                      id: msg.id,
                      message_id: msg.message_id,
                      to: msg.to,
                      from: msg.from,
                      message: msg.message,
                      date: msg.date,
                      time: msg.time,
                    },
                  ],
                };
              } else {
                directMessagesFrom[msg.to] = {
                  ...directMessagesFrom[msg.to],
                  conversation: [
                    ...directMessagesFrom[msg.to].conversation,
                    {
                      id: msg.id,
                      message_id: msg.message_id,
                      to: msg.to,
                      from: msg.from,
                      message: msg.message,
                      date: msg.date,
                      time: msg.time,
                    },
                  ],
                };
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
                convos[key].conversation = [
                  ...convos[key].conversation,
                  ...directMessagesFrom[key].conversation,
                ];
              }
            });

            for (const [key, value] of Object.entries(convos)) {
              value.conversation.sort((a, b) => {
                return a.date - b.date;
              });
            }
            console.log(convos);
            socket.emit("action", { type: "setMessages", data: convos });
          });
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => {
      console.log(err);
    });
}
