function directMessage(state = [], action) {
  switch (action.type) {
    case "setDirectMessages":
      return action.data;
    default:
      return state;
  }
}

export default directMessage;
