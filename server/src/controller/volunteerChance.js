const { VolunteerChance, Organization } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Op } = require("sequelize");

const createVolunteerChance = catchAsyncErrors(async (req, res, next) => {
  const organization = req.organization
  const {
    name,
    description,
    location,
    noOfVolunteer,
    duration
  } = req.body;

  const newChance = await VolunteerChance.create({
    organizationId: organization.id,
    name,
    description,
    location,
    noOfVolunteer,
    duration,
  });

  res.status(201).json({ success: true, data: newChance });
});

const editVolunteerChance = catchAsyncErrors(async (req, res, next) => {
  const updates = req.body;
  const chance = req.chance;

  await chance.update(updates);
  res.status(200).json({ success: true, data: chance });
});

const deleteVolunteerChance = catchAsyncErrors(async (req, res, next) => {
  const chance = req.chance;

  await chance.destroy();
  res.status(200).json({ success: true, msg: "Volunteer chance deleted successfully" });
});

const getVolunteerChances = catchAsyncErrors(async (req, res) => {
  const chances = await VolunteerChance.findAll({
    include: {
      model: Organization,
      attributes: ["name"]
    },
    order: [["id", "DESC"]],
  });

  res.status(200).json({ success: true, chances });
});

const getUnJoinedVolunteerChances = catchAsyncErrors(async (req, res, next) => {
  const volunteer = req.volunteer;

  const joinedChances = await volunteer.getVolunteerChances({ attributes: ["id"] });
  const joinedIds = joinedChances.map(vc => vc.id);

  const chances = await VolunteerChance.findAll({
    where: {
      id: {
        [Op.notIn]: joinedIds
      }
    },
    include: [
      {
        model: Organization,
        attributes: ['name']
      },
    ],
    order: [["id", "DESC"]],
  });

  res.status(200).json({ success: true, chances });
});

const getVolunteerChanceById = catchAsyncErrors(async (req, res, next) => {
  const { volunteerChanceId } = req.params;

  const volunteerChance = await VolunteerChance.findOne({
    where: { id: volunteerChanceId },
    include: [
      {
        model: Organization,
        attributes: ['name']
      },
    ]
  });

  res.status(200).json({ success: true, chance: volunteerChance });
});

const getOrganizationChances = catchAsyncErrors(async (req, res, next) => {
  const organization = req.organization

  const chances = await VolunteerChance.findAll({
    where: { organizationId: organization.id },
    include: [
      {
        model: Organization,
        attributes: ["name"],
      },
    ],
    order: [["id", "DESC"]],
  });

  res.status(200).json({ success: true, chances });
});

module.exports = {
  createVolunteerChance,
  editVolunteerChance,
  deleteVolunteerChance,
  getVolunteerChances,
  getUnJoinedVolunteerChances,
  getVolunteerChanceById,
  getOrganizationChances
};
