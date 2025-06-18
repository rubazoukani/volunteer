const express = require("express");
const { login: loginValidation,
  volunteerRegister: volunteerRegisterValidation,
  organizationRegister: organizationRegisterValidation,
  resetPassword: resetPasswordValidation,
  forgotPassword: forgotPasswordValidation,
  resetForgottenPassword: resetForgottenPasswordValidation,
  updateUserInfo: updateUserInfoValidation
} = require("../validation/auth");
const {
  checkUserExistsByEmail,
  isAuthenticated,
  verifyPassword,
  checkUserExistsById,
  checkVerificationCodeExists
} = require("../middlewares/auth");
const { validate } = require("../utils/validate");
const { login,
  logout,
  verifyToken,
  volunteerRegister,
  organizationRegister,
  resetPassword,
  forgotPassword,
  resetForgottenPassword,
  updateUserInfo
} = require("../controller/auth");


const router = express.Router();

router.get(
  "/verify",
  isAuthenticated,
  verifyToken
);

router.post(
  "/login",
  loginValidation,
  validate,
  checkUserExistsByEmail,
  verifyPassword,
  login
)

router.post(
  "/logout",
  isAuthenticated,
  logout
)

router.post(
  "/volunteer",
  volunteerRegisterValidation,
  validate,
  volunteerRegister
)

router.post(
  "/organization",
  organizationRegisterValidation,
  validate,
  organizationRegister
)

router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  checkUserExistsByEmail,
  forgotPassword
);

router.put(
  "/reset-forgotten-password",
  resetForgottenPasswordValidation,
  validate,
  checkVerificationCodeExists,
  resetForgottenPassword
);

router.put(
  "/reset-password/:userId",
  resetPasswordValidation,
  validate,
  isAuthenticated,
  checkUserExistsById,
  verifyPassword,
  resetPassword
)

router.put(
  "/users/:userId",
  updateUserInfoValidation,
  validate,
  isAuthenticated,
  checkUserExistsById,
  updateUserInfo
);

module.exports = router