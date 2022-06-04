const { reject } = require("bcrypt/promises");
const db = require("../config/pg");
const userModel = {
  allUser: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM users`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  allUsersData: (data) => {
    return new Promise((resolve, reject) => {
      const { searchQuery, offsetValue, limitValue, sortQuery, modeQuery } =
        data;
      db.query(
        `SELECT * FROM users WHERE LOWER(name) LIKE LOWER ('%${searchQuery}%') ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  detailUsersData: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // update user
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
  usernameCheck: (username) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE username='${username}'`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
  updateUserData: (data) => {
    const { id, name, email, username, phone, bio } = data;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET email='${email}', name='${name}', username='${username}'
        , phone='${phone}', bio='${bio}' WHERE id='${id}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  checkPhoto: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT photo FROM users WHERE id ='${id}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  updatePhoto: (photo, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo='${photo}' WHERE id='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = userModel;
