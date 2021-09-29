function tags(state = [], action) {
  switch (action.type) {
    case "addTags":
      return action.data;
    default:
      return state;
  }
}

export default tags;
