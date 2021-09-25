function commentsByPost(message) {
  return {
    type: "server/addComment",
    data: message,
  };
}

export default commentsByPost