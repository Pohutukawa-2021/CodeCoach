function searchUser(state = [], action) {
  switch (action.type) {
    case "setSearchUser":
      return action.data;
    default:
      return state;
  }
}

export default searchUser;
