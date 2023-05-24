const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");
const DashboardController = require("../../controllers/Admin/DashboardController");
const MemberController = require("../../controllers/Admin/MemberController");
const ProcurementController = require("../../controllers/Admin/ProcurementController");

/**
 *  Dashboard for admin
 */
router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  DashboardController.index
);

/**
 *  Member management by admin
 */
router.get(
  "/admin/member/",
  authMiddleware,
  adminMiddleware,
  MemberController.index
);
router.get(
  "/admin/member/:id",
  authMiddleware,
  adminMiddleware,
  MemberController.show
);
router.post(
  "/admin/member/",
  authMiddleware,
  adminMiddleware,
  MemberController.insert
);
router.put(
  "/admin/member/:id",
  authMiddleware,
  adminMiddleware,
  MemberController.update
);
router.delete(
  "/admin/member/:id",
  authMiddleware,
  adminMiddleware,
  MemberController.destroy
);

/**
 *  Procurement management by admin
 */
router.get(
  "/admin/procurement",
  authMiddleware,
  adminMiddleware,
  ProcurementController.index
);
router.get(
  "/admin/procurement/:id",
  authMiddleware,
  adminMiddleware,
  ProcurementController.show
);
router.put(
  "/admin/procurement/:id/process",
  authMiddleware,
  adminMiddleware,
  ProcurementController.process
);

module.exports = router;
