function testReducer(state = "", action) {
  switch (action.type) {
    case "hello":
      return state;
    default:
      return state;
  }
}

export default testReducer;
