const connection = require("../connection");

module.exports = {
  getUserData,
  createUser
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