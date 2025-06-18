const { User, Verification } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors")
const { ErrorHandler } = require("./error")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize")

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies && req.cookies["volunteerToken"];
  if (!token)
    return next(new ErrorHandler("User not authenticated", 401));

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ where: { id: decode.id } });
  if (!user)
    return next(new ErrorHandler("User not authenticated", 401));

  req.authenticatedUser = {
    id: decode.id,
    role: user.role,
    email: user.email,
    username: user.username,
    phone: user.phone
  };

  next();
})

const checkUserExistsByEmail = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (!user)
    return next(new ErrorHandler("User not exists", 404));

  req.user = user;
  next();
})

const checkUserExistsById = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId

  const user = await User.findByPk(userId);
  if (!user)
    return next(new ErrorHandler("User not exists", 404));

  req.user = user;
  next();
})

const isSameUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user
  const authenticatedUser = req.authenticatedUser

  if (user !== authenticatedUser)
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

const isAdmin = catchAsyncErrors(async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser

  if (authenticatedUser.role !== "admin")
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

const isVolunteer = catchAsyncErrors(async (req, res, next) => {
  const authenticatedUser = req.authenticatedUser

  if (authenticatedUser.role !== "volunteer")
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

const verifyPassword = catchAsyncErrors(async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Password incorrect", 400));

  next();
});

const checkVerificationCodeExists = catchAsyncErrors(async (req, res, next) => {
  const { code } = req.body

  const verification = await Verification.findOne({
    where: {
      code: code,
      expiresAt: { [Op.gt]: new Date() },
    },
    include: User,
  });

  if (!verification) {
    return next(new ErrorHandler("Invalid or expired code", 400));
  }

  req.verification = verification
  next()
})

module.exports = {
  isAuthenticated,
  checkUserExistsByEmail,
  verifyPassword,
  checkUserExistsById,
  checkVerificationCodeExists,
  isSameUser,
  isAdmin,
  isVolunteer
}