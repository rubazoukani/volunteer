const { Organization, User } = require("../models");
const { ErrorHandler } = require("./error");
const catchAsyncErrors = require("./catchAsyncErrors");

const checkOrganizationExistsByUserId = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  const organization = await Organization.findOne({
    where: { userId: userId },
    include: [{ model: User }]
  });
  if (!organization)
    return next(new ErrorHandler("Organization not found", 404));

  req.organization = organization;
  next();
});

const isUserAnOrganization = catchAsyncErrors(async (req, res, next) => {
  const user = req.user

  if (user.role !== "organization")
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

const checkUserIsOwnOrganization = catchAsyncErrors(async (req, res, next) => {
  const organizationId = req.organization;
  const user = req.authenticatedUser

  if (user.id !== organizationId.userId)
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})

const checkUserIsOwnOrganizationOrAdmin = catchAsyncErrors(async (req, res, next) => {
  const organization = req.organization;
  const user = req.authenticatedUser

  if (user.role === "admin")
    return next()

  if (user.id !== organization.userId)
    return next(new ErrorHandler("Insufficient permissions", 403))

  next()
})


module.exports = {
  checkOrganizationExistsByUserId,
  isUserAnOrganization,
  checkUserIsOwnOrganizationOrAdmin,
  checkUserIsOwnOrganization
};
