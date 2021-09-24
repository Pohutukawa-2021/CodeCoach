export function sendMessage(message) {
  return {
    type: "server/sendMessage",
    data: message,
  };
}

export function getDirectMessages(recepientId) {
  return {
    type: "server/getDirectMessages",
    recepientId,
  };
}
