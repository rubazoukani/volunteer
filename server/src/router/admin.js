const express = require("express");
const { getAdmin } = require("../controller/admin");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  getAdmin
);

module.exports = router