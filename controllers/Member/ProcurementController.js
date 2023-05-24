const { User, Item, History } = require("../../models");

class ProcurementController {
  static async index(req, res) {
    const { id: userId } = req.user;
    const { status } = req.query;
    const allowedStatus = ["process", "approve", "reject"];

    if (status && allowedStatus.indexOf(status) !== -1) {
      const data = await Item.findAll({
        where: { userId, status },
      });

      return res.status(200).json({
        success: true,
        message: `get all data procurement with filter status = ${status}`,
        data,
      });
    }

    const data = await Item.findAll({
      where: { userId },
    });

    return res.status(200).json({
      success: true,
      message: "get all data procurement",
      data,
    });
  }

  static async show(req, res) {
    const id = req.params.id;
    const { id: userId } = req.user;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "id is required",
      });
    }

    const data = await Item.findOne({
      where: { id, userId },
      attributes: { exclude: ["UserId"] },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["password"] },
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get item member by id",
      data,
    });
  }
}

module.exports = ProcurementController;
