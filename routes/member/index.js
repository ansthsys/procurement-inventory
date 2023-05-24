const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const DashboardController = require("../../controllers/Member/DashboardController");

router.get("/", authMiddleware, DashboardController.index);

module.exports = router;
