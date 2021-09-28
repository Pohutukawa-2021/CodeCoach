function tagsFilter(state = [], action) {
  console.log(action.data);
  switch (action.type) {
    case "setTagFilter":
      return [...action.data];
    default:
      return state;
  }
}

export default tagsFilter;
