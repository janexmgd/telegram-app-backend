const db = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  store: (data) => {
    const id = uuidv4();
    const { sender, receiver, message } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO chats (id,sender,receiver,chat_type,chat,date)
      VALUES('${id}','${sender}','${receiver}','text','${message}',NOW())`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  list: (sender, receiver) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT chats.id AS chatId, chats.chat,
        userSender.id AS senderId, userSender.name AS senderName, userSender.photo AS SenderPhoto,
        userReceiver.id AS receiverId, userReceiver.name AS receiverName, userReceiver.photo AS ReceiverPhoto
        FROM chats
        LEFT JOIN users AS userSender ON chats.sender=userSender.id
        LEFT JOIN users AS userReceiver ON chats.receiver=userReceiver.id
        WHERE
        (sender='${sender}' AND receiver='${receiver}')
        OR
        (sender='${receiver}' AND receiver='${sender}')
        `,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};
