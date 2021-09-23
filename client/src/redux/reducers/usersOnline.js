function usersOnline(state={}, action) {
  switch(action.type) {
    case 'setOnlineUsers':
      return action.data
    default:
      return state
  }
}

export default usersOnline