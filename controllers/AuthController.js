const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models");

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!req.body || !username || !password) {
        return res.status(400).json({
          success: false,
          message: "request body is requred",
        });
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: username }],
        },
      });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
          success: false,
          message: "Credentials not match",
        });
      }

      if (user.status === "inactive") {
        return res.status(401).json({
          success: false,
          message: "Your account is inactive",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "30m",
        }
      );

      res.status(200).json({
        success: true,
        message: "loged in successfully",
        data: {
          type: "JWT",
          token,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err,
      });
    }
  }
}

module.exports = AuthController;
