const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
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

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

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

  static async insert(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "request body is requred",
      });
    }

    const lastData = await User.findOne({
      where: { username: { [Op.substring]: "MBR" } },
      attributes: ["username"],
      order: [["id", "DESC"]],
    });

    const lastUsername = lastData.username.split("-")[1];
    const newNumber = `${parseInt(lastUsername) + 1}`.padStart(4, "0");
    const newUsername = `MBR-${newNumber}`;

    const emailExists = await User.findOne({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "email already used",
      });
    }

    const { id: newID, email: newEmail } = await User.create({
      name,
      username: newUsername,
      email,
      password: bcrypt.hashSync(password, 8),
      role: "member",
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "new member created",
      data: { id: newID, email: newEmail },
    });
  }

  static async update(req, res) {
    const id = req.params.id;
    const { name, password, role, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

    if (!name || !password || !role || !status) {
      return res.status(400).json({
        success: false,
        message: "request body is requred",
      });
    }

    const data = await User.update(
      {
        name,
        password: bcrypt.hashSync(password, 8),
        role,
        status,
      },
      { where: { id } }
    );

    if (!data[0]) {
      return res.status(400).json({
        success: false,
        message: "failed to update member",
      });
    }

    return res.status(200).json({
      success: true,
      message: "update member successfully",
    });
  }

  static async destroy(req, res) {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

    const data = await User.update(
      {
        status: "inactive",
      },
      { where: { id } }
    );

    if (!data[0]) {
      return res.status(400).json({
        success: false,
        message: "failed to delete member",
      });
    }

    return res.status(200).json({
      success: true,
      message: "success delete member (inactive)",
    });
  }
}

module.exports = MemberController;
