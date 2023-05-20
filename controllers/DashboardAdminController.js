const { User } = require("../models");

class DashboardAdminController {
  static async index(req, res) {
    const member = await User.count();
    const memberActive = await User.count({
      where: { status: "active" },
    });
    const memberInactive = await User.count({
      where: { status: "inactive" },
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
      },
    });
  }
}

module.exports = DashboardAdminController;
