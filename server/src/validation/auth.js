const { body, param } = require("express-validator");

const login = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const volunteerRegister = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const organizationRegister = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("name").notEmpty().withMessage("Organization name is required"),
  body("commercialRegister").notEmpty().withMessage("Commercial Register is required"),
];

const resetPassword = [
  body("password").notEmpty().withMessage("Current password is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
  param("userId").isInt().withMessage("User ID must be an integer"),
];

const forgotPassword = [
  body("email").isEmail().withMessage("A valid email is required"),
];

const resetForgottenPassword = [
  body("code").notEmpty().withMessage("Verification code is required"),
  body("password").notEmpty().withMessage("New password is required"),
];

const updateUserInfo = [
  body("email").optional().isEmail().withMessage("Must be a valid email"),
  body("phone").optional().isString().withMessage("Phone must be a string"),
  body("username").optional().isString().withMessage("Username must be a string"),
  param("userId").isInt().withMessage("User ID must be an integer"),
];

const checkUserId = [
  param("userId").isInt().withMessage("User ID must be an integer"),
]


module.exports = {
  login,
  volunteerRegister,
  organizationRegister,
  resetPassword,
  forgotPassword,
  resetForgottenPassword,
  updateUserInfo,
  checkUserId
}
