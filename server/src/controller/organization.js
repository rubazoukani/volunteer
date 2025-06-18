const { Organization, User } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/error");
const { rejectOrganization: rejectOrganizationMail } = require("../utils/mailer")

const createOrganization = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    description,
    facebook,
    youtube,
    instagram,
    website,
    commercialRegister,
  } = req.body;
  const user = req.user

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

  res.status(201).json({ success: true, data: organization });
});

const editOrganization = catchAsyncErrors(async (req, res, next) => {
  const updates = req.body;
  const organization = req.organization

  await organization.update(updates);
  res.status(200).json({ success: true, msg: "Organization edited successfully", organization });
});

const getOrganizations = catchAsyncErrors(async (req, res) => {
  const organizations = await Organization.findAll({
    where: { verified: true },
    include: [{ model: User }],
    order: [["id", "DESC"]],
  });

  res.status(200).json({
    success: true,
    organizations,
  });
});

const deleteOrganization = catchAsyncErrors(async (req, res, next) => {
  const organization = req.organization
  const user = await organization.getUser();
  const authenticatedUser = req.authenticatedUser

  await user.destroy();

  if (authenticatedUser.id === user.id)
    return res
      .status(200)
      .cookie("volunteerToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ success: true, msg: "Organization Deleted Successfully" });

  res.status(200).json({ success: true, msg: "User and organization deleted successfully" });
});

const getOrganizationByUserId = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.params;

  const organization = await Organization.findOne({
    where: { userId },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email', 'phone', 'role'],
      },
    ],
  });

  if (!organization) {
    return next(new ErrorHandler("Organization not found", 404));
  }

  const orgData = organization.toJSON();
  res.status(200).json({ success: true, organization: orgData });
});


const getUnverifiedOrganizations = catchAsyncErrors(async (req, res) => {
  const organizations = await Organization.findAll({
    where: { verified: false },
    include: [{ model: User }],
    order: [["id", "DESC"]],
  });

  res.status(200).json({
    success: true,
    organizations,
  });
});

const verifyOrganization = catchAsyncErrors(async (req, res, next) => {
  const organization = req.organization

  organization.verified = true;
  await organization.save();

  res.status(200).json({ success: true, msg: "Organization verified successfully" });
});

const rejectOrganization = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;
  const organization = req.organization

  const user = organization.User;

  if (!user) return next(new ErrorHandler("User associated with organization not found", 404));

  await rejectOrganizationMail(user.email, organization.name, message)
  await user.destroy();

  res.status(200).json({ success: true, msg: "Organization rejected and user deleted" });
});

module.exports = {
  createOrganization,
  editOrganization,
  getOrganizations,
  deleteOrganization,
  getOrganizationByUserId,
  getUnverifiedOrganizations,
  verifyOrganization,
  rejectOrganization
};
