const { User, Volunteer, Organization, Verification } = require("../models");
const jwtsign = require("../utils/jwtSign");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const { hashingPassword, generateCode } = require("../utils/helpers")

const login = catchAsyncErrors(async (req, res) => {
  const user = req.user;

  const token = await jwtsign({
    id: user.id,
    email: user.email,
  });

  return res
    .status(200)
    .cookie("volunteerToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({ success: true, msg: "Logged in successfully", token });
});

const logout = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .cookie("volunteerToken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .json({ success: true, msg: "User Logged Out Successfully" });
});

const verifyToken = catchAsyncErrors((req, res) => {
  const user = req.authenticatedUser;
  res.status(200).send(user);
});

const volunteerRegister = catchAsyncErrors(async (req, res) => {
  const { username, email, phone, password } = req.body;
  const hashedPassword = await hashingPassword(password)

  const user = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
    role: "volunteer",
  });

  const volunteer = await Volunteer.create({ userId: user.id });

  res.status(201).json({ success: true, msg: "Volunteer registered successfully", user, volunteer });
});

const organizationRegister = catchAsyncErrors(async (req, res) => {
  const {
    username,
    email,
    phone,
    password,
    name,
    description,
    facebook,
    youtube,
    instagram,
    website,
    commercialRegister
  } = req.body;
  const hashedPassword = await hashingPassword(password)

  const user = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
    role: "organization",
  });

  const organization = await Organization.create({
    userId: user.id,
    name,
    description,
    facebook,
    youtube,
    instagram,
    website,
    commercialRegister,
  });

  res.status(201).json({ success: true, msg: "Organization registered successfully", user, organization });
});

const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { newPassword } = req.body;
  const user = req.user

  const hashedPassword = await hashingPassword(newPassword)

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ success: true, msg: "Password updated successfully" });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = req.user
  const code = generateCode();

  await Verification.destroy({ where: { userId: user.id } });
  await Verification.create({
    userId: user.id,
    code,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  res.status(200).json({
    success: true,
    msg: "Verification code sent to email",
  });
});

const resetForgottenPassword = catchAsyncErrors(async (req, res) => {
  const { password } = req.body;
  const verification = req.verification

  const hashedPassword = await hashingPassword(password);

  verification.User.password = hashedPassword;
  await verification.User.save();

  await verification.destroy()

  res.status(200).json({
    success: true,
    msg: "Password has been reset successfully"
  });
});

const updateUserInfo = catchAsyncErrors(async (req, res) => {
  const { email, phone, username } = req.body;
  const user = req.user;

  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (username) user.username = username;

  await user.save();

  res.status(200).json({ success: true, msg: "User info updated successfully", user });
});


module.exports = {
  login,
  logout,
  verifyToken,
  volunteerRegister,
  organizationRegister,
  resetPassword,
  forgotPassword,
  resetForgottenPassword,
  updateUserInfo
}