function posts(state=[], action){
    switch(action.type) {
      case 'setPosts':
        return action.data
      case 'addPosts':
        return [...state, action.data]
      default:
        return state
    }
  }
  
  export default posts;