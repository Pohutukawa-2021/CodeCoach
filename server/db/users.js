const connection = require("../connection");

module.exports = {
  getUserData,
  createUser,
  updateUserDetails,
  addPost,
  getAllPosts,
  getUserDataById,
  changeShape,
  getAllUsers,
  addCommentById,
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
    image_url:
      "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png",
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
  return db("posts")
    .select()
    .then(async (allPosts) => {
      return await Promise.all(
        allPosts.map(async (post) => {
          return await changeShape(post).then((newObj) => {
            // console.log(newObj);
            return newObj;
          });
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
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
    return getCommentsByPost(post).then((commentsWithUsers) => {
      const fullPost = {
        postId: post.id,
        question: post.title,
        body: post.text,
        post_date: post.date,
        post_time: post.time,
        user: {
          name: user.username,
          role: user.role,
          image: user.image_url,
        },
        comments: commentsWithUsers,
      };
      return fullPost;
    });
  });
}

function getAllUsers(db = connection) {
  return db("users").select();
}
function addCommentById(postId, comment, authToken, db = connection) {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const commentObj = {
    post_id: postId,
    user_id: "",
    comment: comment,
    comment_date: date,
    comment_time: time,
  };
  //console.log(commentObj);
  return getUserData(authToken).then((rows) => {
    commentObj["user_id"] = rows[0].id;
    return db("comments").insert(commentObj);
  });
}

function getCommentsByPost(post, db = connection) {
  return db("comments")
    .where("post_id", post.id)
    .select()
    .then(async (allComments) => {
      return await Promise.all(
        allComments.map(async (comment) => {
          return db("users")
            .where("id", comment.user_id)
            .then((user) => {
              return { ...user[0], ...comment };
            });
        })
      );
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
//
