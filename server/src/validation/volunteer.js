const { param } = require("express-validator");

const checkVolunteerChanceId = [
  param("volunteerChanceId").isInt().withMessage("Volunteer Chance ID must be an integer"),
];

module.exports = {
  checkVolunteerChanceId,
};
