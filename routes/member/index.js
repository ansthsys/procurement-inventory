const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const DashboardMemberController = require("../../controllers/DashboardMemberController");

router.get("/", authMiddleware, DashboardMemberController.index);

module.exports = router;
