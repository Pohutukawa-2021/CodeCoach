
function commentsByPost(state=[], action){
  switch(action.type) {
    case 'setComment':
      return action.data
    case 'setNewComment':
      return [...state, action.data]
    default:
      return state
  }
}

export default commentsByPost;