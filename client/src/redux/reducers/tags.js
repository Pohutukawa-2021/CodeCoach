function tags(state = [], action) {
  switch (action.type) {
    case "addTags":
      return action.data;
    case "addNewTags":
      return [...state, ...action.data];
    default:
      return state;
  }
}

export default tags;
