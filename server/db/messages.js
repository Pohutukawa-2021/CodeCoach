const connection = require("../connection");

module.exports = {
  getDM,
};

function getDM(userId, recepientId, db = connection) {
  return db("user_message_relationship")
    .join("messages", "user_message_relationship.message_id", "messages.id")
    .where({ to: recepientId, from: userId });
}
