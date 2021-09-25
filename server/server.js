const {
  getUserData,
  createUser,
  updateUserDetails,
  addPost,
  getAllPosts,
  getUserDataById,
  changeShape,
  getAllUsers,
  addCommentById,
} = require("./db/users");

//message functions
const getDirectMessages = require("./SocketFunctions/Messages/getDirectMessages");
const sendMessage = require("./SocketFunctions/Messages/sendMessage");

//user function
const ridOfDuplicateUsersOnline = require("./SocketFunctions/User/userOnline");

const io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

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
  getUserData(socket.decoded_token.sub).then((rows) => {
    if (rows.length == 0) {
      createUser(socket.decoded_token.sub).then((newData) => {
        socket.emit("action", { type: "setUser", data: newData });
        socket.emit("action", { type: "finishWaiting" });
      });
      getAllPosts().then((allPosts) => {
        io.emit("action", { type: "setPosts", data: allPosts });
      });
      getAllUsers().then((allUsers) => {
        socket.emit("action", { type: "setAllUsers", data: allUsers });
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

const port = 3001;
io.listen(port);
console.log("Server is listening on port ", port);
