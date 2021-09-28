function tagsFilter(state = [], action) {
  switch (action.type) {
    case "setTagFilter":
      return [...action.data];
    default:
      return state;
  }
}

export default tagsFilter;
