const connection = require("../connection");

module.exports = {
  getDMTo,
  getDMFrom,
};

function getDMTo(userId, recepientId, db = connection) {
  return db("user_message_relationship")
    .join("messages", "user_message_relationship.message_id", "messages.id")
    .where({ to: userId })
    .groupBy("to");
}

function getDMFrom(userId, recepientId, db = connection) {
  return db("user_message_relationship")
    .join("messages", "user_message_relationship.message_id", "messages.id")
    .where({ from: userId });
}
