const {
  getUserData,
  createUser,
  updateUserDetails,
  addPost,
  getUserDataById,
  changeShape,
} = require("./db/users");

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
let messages = [];

io.on("connection", (socket) => {
  getUserData(socket.decoded_token.sub).then((rows) => {
    // console.log(rows);
    if (rows.length == 0) {
      createUser(socket.decoded_token.sub).then((newData) => {
        socket.emit("action", { type: "setUser", data: newData });
        socket.emit("action", { type: "finishWaiting" });
      });
    } else {
      socket.emit("action", { type: "setUser", data: rows[0] });
      users[socket.id] = { user: rows[0] };
      io.emit("action", { type: "setOnlineUsers", data: users });
      socket.emit("action", { type: "setMessages", data: messages });
      socket.emit("action", { type: "finishWaiting" });
    }
  });
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "setOnlineUsers", data: users });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/sendMessage":
        messages.push(action.data);
        io.emit("action", { type: "setNewMessage", data: action.data });
        break;
      case "server/sendUserDetails":
        updateUserDetails(action.data, socket.decoded_token.sub).then(
          (data) => {
            users[socket.id] = { user: data };
            io.emit("action", { type: "setOnlineUsers", data: users });
            socket.emit("action", { type: "setUser", data });
          }
        );
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
    }
  });
});

const port = 3001;
io.listen(port);
console.log("Server is listening on port ", port);
