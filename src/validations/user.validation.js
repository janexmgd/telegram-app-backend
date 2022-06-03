const { check } = require("express-validator");
const updateValidation = [
  // name
  check("name", "name cannot be empty").not().isEmpty(),
  check("name", "name only letter allowed").matches(/^[A-Za-z ]+$/),
  check("name", "name must be between 3 and 50 characters").isLength({
    min: 3,
    max: 50,
  }),
  // email
  check("email", "email cannot be empty").not().isEmpty(),
  check("email", "please enter email correctly").isEmail(),
  check("email", "Email maximum length is 50 characters").isLength({
    max: 50,
  }),
  // username
  check("username", "username cannot be empty").not().isEmpty(),
  check(
    "username",
    "username character length cannot be less than five characters"
  ).isLength({
    min: 5,
  }),
  check(
    "username",
    "username character length cannot be more than twelve characters"
  ).isLength({
    max: 12,
  }),
  // phone
  check("phone", "phone number cannot be empty").not().isEmpty(),
  check("phone", "please enter phone number correctly").isMobilePhone(),
  // bio
  check("bio", "bio cannot be empty").not().isEmpty(),
];
module.exports = {
  updateValidation,
};
