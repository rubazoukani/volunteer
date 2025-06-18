const express = require("express");
const {
  createVolunteerChance,
  editVolunteerChance,
  deleteVolunteerChance,
  getVolunteerChances,
  getUnJoinedVolunteerChances,
  getVolunteerChanceById,
  getOrganizationChances,
} = require("../controller/volunteerChance");
const {
  isAuthenticated
} = require("../middlewares/auth");
const {
  checkVolunteerId,
  createVolunteerChance: createVolunteerChanceValidation,
  checkVolunteerChanceId
} = require("../validation/volunteerChance");
const { checkVolunteerChanceExists, checkUserIsOwnChance } = require("../middlewares/volunteerChance");
const { validate } = require("../utils/validate");
const { checkUserIsOwnOrganization, checkOrganizationExistsByUserId } = require("../middlewares/organization");
const { checkUserId } = require("../validation/auth");
const { checkVolunteerExistsByUserId } = require("../middlewares/volunteer");

const router = express.Router();

router.get("/", getVolunteerChances);


router.get(
  "/organization/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkOrganizationExistsByUserId,
  getOrganizationChances
);

router.get("/:volunteerChanceId",
  checkVolunteerChanceId,
  validate,
  checkVolunteerChanceExists,
  getVolunteerChanceById
);

router.get(
  "/unjoined/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkVolunteerExistsByUserId,
  getUnJoinedVolunteerChances
);

router.post( // http://localhost:5005/api/cahnces/1
  "/:userId",
  createVolunteerChanceValidation,
  validate,
  isAuthenticated,
  checkOrganizationExistsByUserId,
  checkUserIsOwnOrganization,
  createVolunteerChance
);

router.put(
  "/:volunteerChanceId",
  checkVolunteerChanceId,
  validate,
  isAuthenticated,
  checkVolunteerChanceExists,
  checkUserIsOwnChance,
  editVolunteerChance
);

router.delete(
  "/:volunteerChanceId",
  checkVolunteerChanceId,
  validate,
  isAuthenticated,
  checkVolunteerChanceExists,
  checkUserIsOwnChance,
  deleteVolunteerChance
);


module.exports = router;