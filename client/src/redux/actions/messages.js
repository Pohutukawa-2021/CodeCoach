export function sendMessage(message) {
  return {
    type: 'server/sendMessage',
    data: message
  }
}