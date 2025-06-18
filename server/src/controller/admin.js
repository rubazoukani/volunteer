const { User } = require("../models")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");

const getAdmin = catchAsyncErrors(async (req, res, next) => {
  const admin = await User.findOne({
    where: { role: "admin" },
  });

  if (!admin) {
    return next(new ErrorHandler("There is no admin", 404));
  }

  res.status(200).json({ success: true, data: admin });
});

module.exports = {
  getAdmin
}