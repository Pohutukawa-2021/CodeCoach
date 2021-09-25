const {
  getUserData,
  createUser,
  updateUserDetails,
  addPost,
  getUserDataById,
  changeShape,
  getAllUsers
} = require("./db/users");

//message functions
const getDirectMessages = require("./SocketFunctions/Messages/getDirectMessages");
const sendMessage = require("./SocketFunctions/Messages/sendMessage");

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
    // console.log(rows);
    if (rows.length == 0) {
      createUser(socket.decoded_token.sub).then((newData) => {
        socket.emit("action", { type: "setUser", data: newData });
      getAllUsers().then(allUsers => {
        socket.emit("action", {type: "setAllUsers", data: allUsers})
      })
        socket.emit("action", { type: "finishWaiting" });
      });
    } else {
      socket.emit("action", { type: "setUser", data: rows[0] });
      users[socket.id] = rows[0];
      io.emit("action", { type: "setOnlineUsers", data: users });

      //This will send the user his/her text messages;
      getDirectMessages(socket);
      getAllUsers().then(allUsers => {
        socket.emit("action", {type: "setAllUsers", data: allUsers})
      })
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
            users[socket.id] = { user: data };
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
          addPost(action.data, socket.decoded_token.sub).then(
            async (allPosts) => {
              return await Promise.all(
                allPosts.map(async (post) => {
                  return await changeShape(post).then((newObj) => {
                    // console.log(newObj);
                    return newObj;
                  });
                })
              ).then((results) => {
                //cnsole.log(results, "sdfghuidfghuhg");
                io.emit("action", { type: "setPosts", data: results });
              });
            }
          );
        } else {
          console.log("emptyemptyempty");
        }
        break;
      case "server/addComment":
        console.log("adding a comment")
    }
  });
});

const port = 3001;
io.listen(port);
console.log("Server is listening on port ", port);
