const express = require("express");
// IMPORT VALIDATION
const {
  registerValidation,
  loginValidation,
} = require("../validations/auth.validation");

// import validation
const validation = require("../middlewares/validation");

// for controller import
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router
  .post("/auth/register", registerValidation, validation, register) // register
  .post("/auth/login", loginValidation, validation, login); // login
module.exports = router;
