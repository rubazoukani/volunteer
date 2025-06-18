const express = require("express");
const {
  createOrganization,
  editOrganization,
  getOrganizations,
  deleteOrganization,
  getOrganizationByUserId,
  getUnverifiedOrganizations,
  verifyOrganization,
  rejectOrganization,
} = require("../controller/organization");
const {
  createOrganization: createValidation,
} = require("../validation/organization");

const { validate } = require("../utils/validate");
const {
  isUserAnOrganization,
  checkUserIsOwnOrganizationOrAdmin,
  checkOrganizationExistsByUserId
} = require("../middlewares/organization");
const { isAuthenticated,
  checkUserExistsById,
  isSameUser,
  isAdmin
} = require("../middlewares/auth");
const { checkUserId } = require("../validation/auth");

const router = express.Router(); // http://localhost:5004/api/organizations

router.get("/", getOrganizations); // http://localhost:5004/api/organizations

router.get("/unverified", // http://localhost:5004/api/organizations/unverified
  isAuthenticated,
  isAdmin,
  getUnverifiedOrganizations
);

router.get("/:userId", // http://localhost:5004/api/organizations/13
  checkUserId,
  validate,
  isAuthenticated,
  checkOrganizationExistsByUserId,
  getOrganizationByUserId
);

router.post( // http://localhost:5004/api/organizations/3
  "/:userId",
  createValidation,
  validate,
  isAuthenticated,
  checkUserExistsById,
  isUserAnOrganization,
  isSameUser,
  createOrganization
);

router.put( // http://localhost:5004/api/organizations/verify/80
  "/verify/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  isAdmin,
  checkOrganizationExistsByUserId,
  verifyOrganization
);

router.put( // http://localhost:5004/api/organizations/reject/80
  "/reject/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  isAdmin,
  checkOrganizationExistsByUserId,
  rejectOrganization
);

router.put(
  "/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkOrganizationExistsByUserId,
  checkUserIsOwnOrganizationOrAdmin,
  editOrganization
);

router.delete( // http://localhost:5004/api/organization/5
  "/:userId",
  checkUserId,
  validate,
  isAuthenticated,
  checkOrganizationExistsByUserId,
  checkUserIsOwnOrganizationOrAdmin,
  deleteOrganization
);

module.exports = router;
