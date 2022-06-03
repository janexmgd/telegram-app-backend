const express = require("express");

// for import controller
const {
  allUsers,
  detailUser,
  updateUser,
} = require("../controllers/users.controller");

// import middlewares
const jwtAuth = require("../middlewares/jwtAuth");
const validation = require("../middlewares/validation");

// import express-validator
const { updateValidation } = require("../validations/user.validation");

const router = express.Router();

router
  .get("/users", jwtAuth, allUsers) // get all user
  .get("/users/:id", jwtAuth, detailUser) // get all user
  .put("/users", jwtAuth, updateValidation, validation, updateUser);

module.exports = router;
