const { store, list } = require('../models/chat.model');
module.exports = (io, socket) => {
  socket.on('join-room', (data) => {
    // join ke room sendiri
    const { id, name, email, photo } = data;
    socket.join(id);
  });
  socket.on('send-message', (data) => {
    const { sender, receiver, message } = data;
    // return console.log(data);
    // simpan ke db
    store(data)
      .then(async () => {
        const listChats = await list(data.sender, data.receiver);
        // return console.log(listChats.rows);
        // kirim pesan ke orang lain
        io.to(receiver).emit('send-message-response', listChats.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on('chat-history', async (data) => {
    const { sender, receiver } = data;
    // return console.log(data);
    const listChat = await list(data.sender, data.receiver);

    // return console.log(listChat.rows);
    io.to(sender).emit('send-message-response', listChat.rows);
  });
};
