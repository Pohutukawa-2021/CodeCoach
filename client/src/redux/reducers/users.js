function users(state=[], action) {
  switch (action.type) {
    case 'setAllUsers':
      return action.data
    default:
      return state
  }
}

export default users