const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");
const MemberController = require("../../controllers/MemberController");

/**
 * 
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

module.exports = router;
