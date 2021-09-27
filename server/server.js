const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/*", (req, res, next) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

const {
  getUserData,
  createUser,
  updateUserDetails,
  getUserDataById,
  getAllUsers,
} = require("./db/users");

const {
  getAllPosts,
  changeShape,
  addPost,
  addCommentById,
  getCommentsByPost,
} = require("./db/post");

//message functions
const getDirectMessages = require("./SocketFunctions/Messages/getDirectMessages");
const sendMessage = require("./SocketFunctions/Messages/sendMessage");

//user function
const ridOfDuplicateUsersOnline = require("./SocketFunctions/User/userOnline");

const jwt = require("express-jwt");
const socketioJwt = require("socketio-jwt");
const jwks = require("jwks-rsa");

const secret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: "https://dev-ngqwdtsq.us.auth0.com/.well-known/jwks.json",
});

io.use(
  socketioJwt.authorize({
    secret,
    handshake: true,
  })
);

let users = {};

io.on("connection", (socket) => {
<<<<<<< HEAD
  getAllPosts()
    .then((allPosts) => {
      io.emit("action", { type: "setPosts", data: allPosts });
    })
    .catch((err) => console.log("getAllPost function", err.message));
  getUserData(socket.decoded_token.sub)
    .then((rows) => {
      if (rows.length == 0) {
        createUser(socket.decoded_token.sub)
          .then((newData) => {
            socket.emit("action", { type: "setUser", data: newData });
            getAllUsers()
              .then((allUsers) => {
                socket.emit("action", { type: "setAllUsers", data: allUsers });
              })
              .catch((err) =>
                console.log("getAll users function", err.message)
              );
            socket.emit("action", { type: "finishWaiting" });
          })
          .catch((err) => console.log("create user", err.message));
      } else {
        socket.emit("action", { type: "setUser", data: rows[0] });

        //This will get rid of previous logins of users and update to new socket
        ridOfDuplicateUsersOnline(users, socket.decoded_token.sub);
        users[socket.id] = rows[0];

        io.emit("action", { type: "setOnlineUsers", data: users });

        //This will send the user his/her text messages;
        getDirectMessages(socket);
        getAllUsers()
          .then((allUsers) => {
            socket.emit("action", { type: "setAllUsers", data: allUsers });
          })
          .catch((err) => console.log("getAllUsers", err.message));
        socket.emit("action", { type: "finishWaiting" });
      }
    })
    .catch((err) => console.log("getUserData function", err.message));
=======
  getUserData(socket.decoded_token.sub).then((rows) => {
    if (rows.length == 0) {
      createUser(socket.decoded_token.sub).then((newData) => {
        socket.emit("action", { type: "setUser", data: newData });
        getAllUsers().then((allUsers) => {
          socket.emit("action", { type: "setAllUsers", data: allUsers });
        });
        socket.emit("action", { type: "finishWaiting" });
      });
    } else {
      socket.emit("action", { type: "setUser", data: rows[0] });

      //This will get rid of previous logins of users and update to new socket
      ridOfDuplicateUsersOnline(users, socket.decoded_token.sub);
      users[socket.id] = rows[0];

      io.emit("action", { type: "setOnlineUsers", data: users });

      //This will send the user his/her text messages;
      getDirectMessages(socket);
      getAllUsers().then((allUsers) => {
        socket.emit("action", { type: "setAllUsers", data: allUsers });
      });
      getAllPosts().then((allPosts) => {
        io.emit("action", { type: "setPosts", data: allPosts });
      });
      socket.emit("action", { type: "finishWaiting" });
    }
  });
>>>>>>> 9b64707033615a42d675a295d21274efb8c3fd1a

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "setOnlineUsers", data: users });
  });

  socket.on("action", (action) => {
    switch (action.type) {
      case "server/sendUserDetails":
        updateUserDetails(action.data, socket.decoded_token.sub).then(
          (data) => {
            users[socket.id] = { ...data };
            io.emit("action", { type: "setOnlineUsers", data: users });
            socket.emit("action", { type: "setUser", data });
            getAllUsers().then((allUsers) => {
              socket.emit("action", { type: "setAllUsers", data: allUsers });
            });
            getAllPosts().then((allPosts) => {
              io.emit("action", { type: "setPosts", data: allPosts });
            });
          }
        );
        break;
      case "server/sendMessage":
        sendMessage(io, socket, action, users);
        break;
      case "server/addPost":
        console.log("adding post");
        if (action.data.title != null || action.data.body != null) {
          addPost(action.data, socket.decoded_token.sub).then((results) => {
            io.emit("action", { type: "setPosts", data: results });
          });
        } else {
          console.log("emptyemptyempty");
        }
        break;
      case "server/addComment":
        // console.log(action.data);
        addCommentById(
          action.data.postId,
          action.data.comment,
          socket.decoded_token.sub
        ).then(() => {
          getAllPosts().then((allPosts) => {
            //console.log(allPosts);
            io.emit("action", { type: "setPosts", data: allPosts });
          });
        });
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port);
console.log("Server is listening on port ", port);
