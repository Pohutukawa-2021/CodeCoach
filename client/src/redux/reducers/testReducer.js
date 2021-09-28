function testReducer(state = "", action) {
  switch (action.type) {
    case 'hello':
      console.log('hello');
      return state;
    default: 
      return state;
  }
}

export default testReducer;