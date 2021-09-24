const connection = require("../connection");

module.exports = {
  getUserData,
  createUser,
  updateUserDetails,
  addPost,
  getAllPosts,
  getUserDataById,
  changeShape,
};

function getUserData(authId, db = connection) {
  return db("users").where({ auth_id: authId });
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
      return getUserDataById(id).then((data) => {
        return data;
      });
    });
}

function updateUserDetails(user, authToken, db = connection) {
  const updateUser = {
    email: user.email,
    username: user.name,
    image_url: user.picture,
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

function getAllPosts(db = connection) {
  return db("posts").select();
}

function addPost(post, authToken, db = connection) {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const newPost = {
    title: post.title,
    text: post.body,
    date: date,
    time: time,
  };
  return getUserData(authToken).then((rows) => {
    //console.log(rows);
    newPost["user_id"] = rows[0].id;
    return db("posts")
      .insert(newPost)
      .then(() => {
        // console.log("data:",data);
        return getAllPosts().then((data) => data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}
function changeShape(post, db = connection) {
  return getUserDataById(post.user_id).then((user) => {
    return { ...post, ...user };
  });
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
