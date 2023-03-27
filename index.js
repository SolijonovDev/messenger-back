const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  origin: "*"
});

const cors = require('cors');

app.use(cors({ origin: '*' }))
app.get('/', (req, res) => {
  res.status(200).json({ message: "Ok" });
});

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", (arg, chatId, userId, callback) => {
    callback("got it");
    io.emit('receive-message', arg, chatId, userId);
  });
});

server.listen(4200, () => {
  console.log('listening on *:4200');
});