const { 
  getUserData, 
  createUser, 
  updateUserDetails } = require("./db/users")

const io = require('socket.io')({
  cors: {
    origin: '*',
  },
});

const jwt = require('express-jwt')
const socketioJwt = require('socketio-jwt');
const jwks = require('jwks-rsa');

const secret = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-ngqwdtsq.us.auth0.com/.well-known/jwks.json'
});

io.use(
  socketioJwt.authorize({
    secret,
    handshake: true,
  })
)

let users = {}
let messages = []

function initializeAccount(io, socket) {
  io.emit('action', {type: 'setOnlineUsers', data: users})
  socket.emit('action', {type: 'setMessages', data: messages})
  socket.emit('action', {type: 'finishWaiting'})
}



io.on('connection', (socket) => {
  getUserData(socket.decoded_token.sub).then(rows => {
    if(rows.length == 0) {
      createUser(socket.decoded_token.sub).then(newData => {
        socket.emit('action', {type: 'setUser', data: newData})
        initializeAccount(io, socket)
      })
    } else {
      socket.emit('action', {type: 'setUser', data: rows[0]})
      users[socket.id] = { user: rows[0]}
      initializeAccount(io, socket)
    }
  })
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('action', {type: 'setOnlineUsers', data: users})
  })
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/sendMessage':
        messages.push(action.data)
        io.emit('action', {type: 'setNewMessage', data: action.data})
        break;
      case 'server/sendUserDetails':
        updateUserDetails(action.data, socket.decoded_token.sub).then(data => {
          users[socket.id] = { user: data}
          io.emit('action', {type: 'setOnlineUsers', data: users})
          socket.emit('action', {type: 'setUser', data})
        })
    }
  })
})

const port = 3001;
io.listen(port)
console.log('Server is listening on port ', port)