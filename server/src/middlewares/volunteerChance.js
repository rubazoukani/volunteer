const { VolunteerChance, Volunteer, Organization } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");
const { ErrorHandler } = require("./error");

const checkVolunteerChanceExists = catchAsyncErrors(async (req, res, next) => {
  const { volunteerChanceId } = req.params;
  const volunteerChance = await VolunteerChance.findByPk(volunteerChanceId);

  if (!volunteerChance) {
    return next(new ErrorHandler("Volunteer Chance not found", 404));
  }

  req.chance = volunteerChance
  next();
})

const checkUserIsOwnChance = catchAsyncErrors(async (req, res, next) => {
  const volunteerChance = req.chance;
  const user = req.authenticatedUser

  const organization = await Organization.findOne({ where: { userId: user.id } })
  if (!organization)
    return next(new ErrorHandler("Organization not found", 404))

  if (volunteerChance.organizationId !== organization.id)
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

module.exports = {
  checkVolunteerChanceExists,
  checkUserIsOwnChance
};
