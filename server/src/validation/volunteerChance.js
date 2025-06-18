const { body, param } = require("express-validator");

const createVolunteerChance = [
  param("userId").isInt().withMessage("userId must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("noOfVolunteer")
    .isInt({ min: 1 })
    .withMessage("noOfVolunteer must be at least 1"),
  body("duration").notEmpty().withMessage("Duration is required"),
];

const checkVolunteerChanceId = [
  param("volunteerChanceId").isInt().withMessage("volunteerChanceId must be an integer"),
];

const checkVolunteerId = [
  param("volunteerId").isInt().withMessage("volunteerId must be an integer"),
];

module.exports = {
  createVolunteerChance,
  checkVolunteerChanceId,
  checkVolunteerId
}
