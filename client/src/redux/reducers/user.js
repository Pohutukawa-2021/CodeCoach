function userAccount(state={}, action) {
  switch (action.type) {
    case 'setUser':
      return {...action.data}
    default:
      return state
  }
}

export default userAccount;