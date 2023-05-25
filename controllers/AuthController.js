const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, access_tokens } = require("../models");

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
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1d",
        }
      );

      await access_tokens.create({
        userId: user.id,
        name: "login token",
        token,
      });

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

  static async logout(req, res) {
    const data = await access_tokens.destroy({
      where: { token: req.token },
    });

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "failed to logout",
      });
    }

    return res.status(200).json({
      success: true,
      message: "success logged out",
    });
  }
}

module.exports = AuthController;
