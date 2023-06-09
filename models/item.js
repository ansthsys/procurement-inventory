"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      category: DataTypes.ENUM("object", "vechile"),
      qty: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      total_price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      url_request: DataTypes.TEXT,
      status: DataTypes.ENUM("process", "approve", "reject"),
      due_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  Item.associate = function (models) {
    Item.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Item.hasOne(models.History);
  };
  return Item;
};
