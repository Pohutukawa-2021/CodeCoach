function waiting(state=true, action) {
  switch(action.type) {
    case 'setWaiting':
      return true
    case 'finishWaiting':
      return false
    default:
      return state
  }
}

export default waiting