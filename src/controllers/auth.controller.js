// import package
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const authModel = require("../models/auth.model");
const jwtToken = require("../helpers/generateJWTtoken");

// import helpers
const { success, failed } = require("../helpers/response");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      // return console.log("hi");
      const emailCheck = await authModel.emailCheck(email);
      if (emailCheck.rowCount >= 1) {
        const error = {
          message: "email is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: error.message,
          error: [],
        });
        return;
      }
      const nameCheck = await authModel.nameCheck(name);
      if (nameCheck.rowCount >= 1) {
        const error = {
          message: "name is already registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: error.message,
          error: [],
        });
        return;
      }
      const id = uuidv4();
      const passwordHashed = await bcrypt.hash(password, 10);
      const photo = "default.png";
      const data = {
        id,
        email,
        passwordHashed,
        name,
        photo,
      };
      await authModel.register(data);
      success(res, {
        code: 200,
        status: "success",
        message: "Registered sucesss",
        data: data,
        paggination: [],
      });
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const emailCheck = await authModel.emailCheck(email);
      if (emailCheck.rowCount >= 1) {
        bcrypt
          .compare(password, emailCheck.rows[0].password)
          .then(async (match) => {
            if (match) {
              const token = await jwtToken(emailCheck.rows[0]);
              success(res, {
                code: 200,
                status: "success",
                message: "login success",
                token: token,
                data: emailCheck.rows[0],
              });
            } else {
              // login gagal
              const err = {
                message: "wrong email or password",
              };
              failed(res, {
                code: 500,
                status: "error",
                message: err.message,
                error: [],
              });
            }
          });
      } else {
        const err = {
          message: "email not registered",
        };
        failed(res, {
          code: 500,
          status: "error",
          message: err.message,
          error: [],
        });
      }
    } catch (error) {
      failed(res, {
        code: 500,
        status: "error",
        message: error.message,
        error: [],
      });
    }
  },
};
