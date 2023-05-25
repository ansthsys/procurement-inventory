const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth");
const AuthController = require("../../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/logout", authMiddleware, AuthController.logout);

module.exports = router;
