const express = require("express");

// for import controller
const {
  allUsers,
  detailUser,
  updateUser,
  updateUserPhoto,
} = require("../controllers/users.controller");

// import middlewares
const jwtAuth = require("../middlewares/jwtAuth");
const usersUpload = require("../middlewares/usersUpload");
const validation = require("../middlewares/validation");

// import express-validator
const { updateValidation } = require("../validations/user.validation");

const router = express.Router();

router
  .get("/users", jwtAuth, allUsers) // get all user
  .get("/users/:id", jwtAuth, detailUser) // get all user
  .put("/users", jwtAuth, updateValidation, validation, updateUser)
  .put("/users-photo", jwtAuth, usersUpload, updateUserPhoto);

module.exports = router;
