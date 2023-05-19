const { User } = require("../models");

class MemberController {
  static async index(req, res) {
    const data = await User.findAll({
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });

    res.status(200).json({
      success: true,
      message: "get all members",
      data,
    });
  }

  static async show(req, res) {
    const id = req.params.id;
    const data = await User.findOne({
      where: { id: id },
      attributes: { exclude: ["password"] },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get member by id",
      data,
    });
  }
}

module.exports = MemberController;
