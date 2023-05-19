const { User } = require("../models");

class MemberController {
  static async index(req, res) {
    const data = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      success: true,
      message: "get all members",
      data,
    });
  }
}

module.exports = MemberController;
