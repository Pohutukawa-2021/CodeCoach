const connection = require("../connection");

module.exports = {
  getDMTo,
  getDMFrom,
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
