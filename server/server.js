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

io.on('connection', (socket) => {
  console.log('A user has joined', socket.decoded_token);
  
  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/hello':
        console.log('hello')
        socket.emit('action', {type: 'hello'})
    }
  })
})

const port = 3001;
io.listen(port)
console.log('Server is listening on port ', port)