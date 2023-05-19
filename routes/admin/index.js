const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");
const UserController = require("../../controllers/UserController");

router.get("/admin/", authMiddleware, adminMiddleware, UserController.index);
router.get("/admin/:id", UserController.show);
router.post("/admin/", UserController.insert);
router.put("/admin/:id", UserController.update);
router.delete("/admin/:id", UserController.destroy);

module.exports = router;
