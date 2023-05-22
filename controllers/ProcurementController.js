const { User, Item } = require("../models");

class ProcurementController {
  static async index(req, res) {
    const data = await Item.findAll({
      where: {
        status: "process"
      }
    })

    return res.status(200).json({
      success: true,
      message: "get all data procurement",
      data,
    });
  }
}

module.exports = ProcurementController;
