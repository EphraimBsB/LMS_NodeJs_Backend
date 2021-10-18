"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccNumbers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Books }) {
      AccNumbers.belongsTo(Books, {
        foreignKey: "bookId",
        targetKey: "id",
      });
    }
  }
  AccNumbers.init(
    {
      bookId: DataTypes.INTEGER,
      acc_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AccNumbers",
    }
  );
  return AccNumbers;
};
