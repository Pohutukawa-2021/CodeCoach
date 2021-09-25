const connection = require('connection')

module.exports = {
  getAllPosts,
  changeShape,
  addPost
}

function getAllPosts(db = connection) {
  return db("posts").select();
}

function changeShape(post, db = connection) {
  return getUserDataById(post.user_id).then((user) => {
    return { ...user, ...post };
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