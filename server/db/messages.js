const connection = require("../connection");

module.exports = {
  getDMTo,
  getDMFrom,
  addMessage,
};

function getDMTo(userId, db = connection) {
  return db("user_message_relationship")
    .join("messages", "user_message_relationship.message_id", "messages.id")
    .where({ to: userId });
}

function getDMFrom(userId, db = connection) {
  return db("user_message_relationship")
    .join("messages", "user_message_relationship.message_id", "messages.id")
    .where({ from: userId });
}

function addUserMessageRelationship(msgId, toId, fromId, db = connection) {
  const newRelationship = {
    message_id: msgId,
    to: parseInt(toId),
    from: parseInt(fromId),
  };
  return db("user_message_relationship").insert(newRelationship);
}

function addMessage(msgObj, db = connection) {
  const newMessage = {
    message: msgObj.data.message,
    date: msgObj.data.date,
    time: msgObj.data.time,
  };
  return db("messages")
    .insert(newMessage)
    .returning("id")
    .then((id) => {
      return addUserMessageRelationship(
        parseInt(id),
        msgObj.data.to,
        msgObj.data.from
      );
    });
}
