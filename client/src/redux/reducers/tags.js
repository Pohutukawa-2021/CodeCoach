function tags(state = [], action) {
  switch (action.type) {
    case "addTags":
      return [...state, ...action.data];
    default:
      return state;
  }
}

export default tags;
