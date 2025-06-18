const { Volunteer, VolunteerChance } = require("../models");
const { ErrorHandler } = require("./error");
const catchAsyncErrors = require("./catchAsyncErrors");

const checkVolunteerExistsByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  const volunteer = await Volunteer.findOne({ where: { userId } });
  if (!volunteer) return next(new ErrorHandler("Volunteer not found", 404));

  req.volunteer = volunteer;
  next();
});

const checkVolunteerChanceExists = catchAsyncErrors(async (req, res, next) => {
  const { volunteerChanceId } = req.params;

  const volunteerChance = await VolunteerChance.findByPk(volunteerChanceId);
  if (!volunteerChance) return next(new ErrorHandler("Volunteer chance not found", 404));

  req.volunteerChance = volunteerChance;
  next();
});

const isSameVolunteerOrAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = req.authenticatedUser
  const volunteer = req.volunteer

  if (user.role === "admin")
    return next()

  if ((user.role === "volunteer") && (user.id === volunteer.userId))
    return next()

  next(new ErrorHandler("Insufficient permissions", 403))
})

const getVolunteerFromAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const user = req.authenticatedUser

  const volunteer = await Volunteer.findOne({ where: { userId: user.id } })

  if (!volunteer)
    return next(new ErrorHandler("Insufficient permissions", 403))

  req.volunteer = volunteer
  next()
})

module.exports = {
  checkVolunteerExistsByUserId,
  checkVolunteerChanceExists,
  isSameVolunteerOrAdmin,
  getVolunteerFromAuthenticated
};
