function messages(state=[], action){
  switch(action.type) {
    case 'setMessages':
      return action.data
    case 'setNewMessage':
      return [...state, action.data]
    default:
      return state
  }
}

export default messages;