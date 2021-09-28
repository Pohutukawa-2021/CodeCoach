const connection = require("../connection");

module.exports = {
  getAllPosts,
  changeShape,
  addPost,
  addCommentById,
  getCommentsByPost,
  updatePost,
};

const { getUserData, getUserDataById } = require("./users");

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

function changeShape(post, db = connection) {
  const tags = post.tags.split(",");
  return getUserDataById(post.user_id).then((user) => {
    return getCommentsByPost(post).then((commentsWithUsers) => {
      const fullPost = {
        postId: post.id,
        question: post.title,
        body: post.text,
        post_date: post.date,
        post_time: post.time,
        post_tags: tags,
        user: {
          name: user.username,
          role: user.role,
          image: user.image_url,
          id: user.id,
        },
        comments: commentsWithUsers,
      };
      return fullPost;
    });
  });
}

function addPost(post, authToken, db = connection) {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(post);
  const newPost = {
    title: post.title,
    text: post.body,
    date: date,
    time: time,
    tags: post.tags,
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
function updatePost(post, db = connection) {
  return db("posts").where("id", post.id).update(post);
}
