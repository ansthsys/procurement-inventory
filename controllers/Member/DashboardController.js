const { Item } = require("../../models");

class DashboardController {
  static async index(req, res) {
    const { id: userId } = req.user;
    const total = await Item.count({ where: { userId } });
    const processed = await Item.count({
      where: { userId, status: "process" },
    });
    const approved = await Item.count({
      where: { userId, status: "approve" },
    });
    const rejected = await Item.count({
      where: { userId, status: "reject" },
    });

    const lastRequest = await Item.findAll({
      where: { userId, status: "process" },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "get data for dashboard",
      data: {
        requestInventory: {
          total,
          processed: processed,
          approved: approved,
          rejected: rejected,
        },
        lastRequest,
      },
    });
  }
}

module.exports = DashboardController;
