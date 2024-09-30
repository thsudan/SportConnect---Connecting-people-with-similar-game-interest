// server.js
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');  // Import your app

const server = http.createServer(app);
const io = socketIo(server);

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Function to start the server
const startServer = (port = 3000) => {
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      resolve();
    });
  });
};

// Only start the server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = { server, startServer };
