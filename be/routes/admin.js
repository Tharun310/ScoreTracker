var express = require("express");
var router = express.Router();
const admin = require("../models/Controller/admin");
const { adminValidate } = require("../config/jwtConfig");
// Http Methods

router.get("/admin_validate", adminValidate, admin.validateAdmin);
router.get("/get_teams", admin.getTeams)

module.exports = router;
