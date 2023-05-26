const { User, Item } = require("../../models");

class DashboarController {
  static async index(req, res) {
    const member = await User.count();
    const memberActive = await User.count({ where: { status: "active" } });
    const memberInactive = await User.count({ where: { status: "inactive" } });

    const item = await Item.count();
    const itemProcessed = await Item.count({ where: { status: "process" } });
    const itemApproved = await Item.count({ where: { status: "approve" } });
    const itemRejected = await Item.count({ where: { status: "reject" } });

    const lastRequest = await Item.findAll({
      where: { status: "process" },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    return res.status(200).json({
      success: true,
      message: "get data for dashboard",
      data: {
        member: {
          total: member,
          active: memberActive,
          inactive: memberInactive,
        },
        requestInventory: {
          total: item,
          processed: itemProcessed,
          approved: itemApproved,
          rejected: itemRejected,
        },
        lastRequest
      },
    });
  }
}

module.exports = DashboarController;
