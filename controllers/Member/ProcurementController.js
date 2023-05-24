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
}

module.exports = ProcurementController;
