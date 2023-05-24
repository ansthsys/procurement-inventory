const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const DashboardController = require("../../controllers/Member/DashboardController");
const ProcurementContontroller = require("../../controllers/Member/ProcurementController");

/**
 *  Dashboard for member
 */
router.get("/", authMiddleware, DashboardController.index);

/**
 *  Dashboard for member
 */
router.get("/procurement", authMiddleware, ProcurementContontroller.index);
router.get("/procurement/:id", authMiddleware, ProcurementContontroller.show);
router.post("/procurement", authMiddleware, ProcurementContontroller.insert);

module.exports = router;
