function search(state = [], action) {
  switch (action.type) {
    case "setSearch":
      return action.data;
    default:
      return state;
  }
}

export default search;
