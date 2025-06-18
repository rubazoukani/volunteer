const express = require("express");
const {
  getVolunteers,
  getVolunteerByUserId,
  deleteVolunteer,
  joinVolunteerChance
} = require("../controller/volunteer");

const {
  checkVolunteerChanceId
} = require("../validation/volunteer");

const { validate } = require("../utils/validate");
const {
  checkVolunteerExistsByUserId,
  checkVolunteerChanceExists,
  isSameVolunteerOrAdmin,
  getVolunteerFromAuthenticated
} = require("../middlewares/volunteer");

const { isAuthenticated, isAdmin, isVolunteer } = require("../middlewares/auth");
const { checkUserId } = require("../validation/auth");

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getVolunteers);

router.get("/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkVolunteerExistsByUserId,
  isSameVolunteerOrAdmin,
  getVolunteerByUserId
);

router.delete("/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkVolunteerExistsByUserId,
  isSameVolunteerOrAdmin,
  deleteVolunteer
);

router.post("/join/:volunteerChanceId",
  checkVolunteerChanceId,
  validate,
  isAuthenticated,
  isVolunteer,
  getVolunteerFromAuthenticated,
  checkVolunteerChanceExists,
  joinVolunteerChance
);

module.exports = router;
