const connection = require("../connection");

module.exports = {
  getUserData,
  createUser,
  updateUserDetails,
  getUserDataById,
  getAllUsers,
};
function getUserData(authId, db = connection) {
  return db("users").where({ auth_id: authId });
}

function getAllUsers(db = connection) {
  return db("users").select();
}

function getUserDataById(userId, db = connection) {
  return db("users").where({ id: userId }).first();
}

function createUser(authId, db = connection) {
  const newUser = {
    email: "",
    username: "",
    role: "",
    auth_id: authId,
    image_url: "",
  };
  return db("users")
    .insert(newUser)
    .then(([id]) => {
      return getUserDataById(id)
        .then((data) => {
          return data;
        })
        .catch((err) =>
          console.log("happens on second level catch", err.message)
        );
    })
    .catch((err) => console.log("happens on first level catch", err.message));
}

function updateUserDetails(user, authToken, db = connection) {
  const updateUser = {
    email: user.email,
    username: user.name,
    image_url: user.picture,
    bio: user.bio,
    role: user.role,
    experience: user.experience,
  };
  return db("users")
    .where({ auth_id: authToken })
    .update(updateUser)
    .then(() => {
      return getUserData(authToken).then((data) => {
        return data[0];
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function getAllUsers(db = connection) {
  return db("users").select();
}

// function getUserByPost(userId, db = connection) {
//   return db("users")
//     .join("posts", "posts.user_id", "users.id")
//     .where("users.id", userId)
//     .select(
//       "users.username",
//       "users.email",
//       "users.role",
//       "users.image_url",
//       "posts.title",
//       "posts.text",
//       "posts.time",
//       "posts.date"
//     )
//     .then((result) => {
//       return {
//         username: result[0].username,
//         email: result[0].email,
//         role: result[0].role,
//         image_url: result[0].image_url,
//         title: result[0].title,
//         text: result[0].text,
//         date: result[0].date,
//         time: result[0].time,
//       };
//     });
// }
//
