const db = require("../config/pg");

const authModel = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      const { id, email, passwordHashed, name, photo } = data;
      db.query(
        `INSERT INTO users(id,email,password,name,photo) 
      VALUES('${id}','${email}','${passwordHashed}','${name}','${photo}')`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  emailCheck: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
  nameCheck: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE name='${name}'`, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
module.exports = authModel;
