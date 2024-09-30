const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const session = require('express-session'); // Added for session management
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const mongoURI = 'mongodb+srv://s224589292:ayQ8yTJGRyJF2hzL@cluster0.ctiaqgd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0on_string';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
  secret: 'your_secret_key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userRoutes);

app.get('/search-based-on-location', (req, res) => {
  res.render('locationSearch');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
