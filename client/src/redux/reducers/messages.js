function messages(state = {}, action) {
  switch (action.type) {
    case "setMessages":
      return action.data;
    case "setNewMessage":
      const conversationId = action.data.to;
      let newStateObject = { ...state };
      if (newStateObject[conversationId] === undefined) {
        newStateObject[conversationId] = [action.data];
      } else {
        newStateObject[conversationId] = [
          ...newStateObject[conversationId],
          action.data,
        ];
      }
      return newStateObject;
    default:
      return state;
  }
}

export default messages;
