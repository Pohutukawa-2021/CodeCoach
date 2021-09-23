const { getUserData, createUser } = require("./db/users")
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

const mockUser = {
  email: 'testuser123@gmail.com',
  username: 'testuser123',
  authid: 'testAuthId',
  role: 'junior'
}

let users = {}
let messages = []

io.on('connection', (socket) => {
  getUserData(socket.decoded_token.sub).then(rows => {
    console.log(rows)
    if(rows.length == 0) {
      createUser(socket.decoded_token.sub).then(newData => 
        socket.emit('action', {type: 'setUser', data: newData})
      )
    } else {
      socket.emit('action', {type: 'setUser', data: rows[0]})
    }
  })
  users[socket.id] = { user: socket.decoded_token.sub}
  console.log(users)
  socket.emit('action', {type: 'setMessages', data: messages})
  socket.on('disconnect', () => {
    delete users[socket.id]
  })
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/hello':
        console.log('hello')
        socket.emit('action', {type: 'hello'})
      case 'server/sendMessage':
        messages.push(action.data)
        io.emit('action', {type: 'setNewMessage', data: action.data})
    }
  })
})

const port = 3001;
io.listen(port)
console.log('Server is listening on port ', port)