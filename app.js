const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client")));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    console.log('message: ' + msg);
    io.emit('chat message', msg); // broadcast to everyone
  });
});

http.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});