const { body, param } = require("express-validator");

const createOrganization = [
  param("userId").isInt().withMessage("User ID must be an integer"),
  body("name").notEmpty().withMessage("Name is required"),
  body("commercialRegister").isInt().withMessage("Commercial register is required"),
];

module.exports = {
  createOrganization,
};
