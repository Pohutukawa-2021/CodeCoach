const connection = require("../connection");

module.exports = {
  getUserData,
  createUser,
  updateUserDetails
}

function getUserData(authId, db = connection) {
  return db('users').where({auth_id: authId})
}

function getUserDataById(userId, db = connection) {
  return db('users').where({id: userId}).first()
}

function createUser(authId, db = connection) {
  const newUser = {
    email: "",
    username: "",
    role: "",
    auth_id: authId,
    image_url: ""
  }
  return db('users').insert(newUser).then(([id]) => {
    return getUserDataById(id).then(data => {
      return data;
    })
  })
}

function updateUserDetails(user, authToken, db = connection) {
  const updateUser = {
    email: user.email,
    username: user.name,
    image_url: user.picture
  }
  return db('users').where({auth_id: authToken}).update(updateUser)
  .then(() => {
    return getUserData(authToken).then(data => {
      return data[0]
    })
  }).catch(err => {
    console.log(err.message)
  })
}