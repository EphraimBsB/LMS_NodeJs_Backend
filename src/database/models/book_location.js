"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Books }) {
      Location.belongsTo(Books, {
        foreignKey: "bookId",
        targetKey: "id",
      });
    }
  }
  Location.init(
    {
      bookId: DataTypes.INTEGER,
      block: DataTypes.INTEGER,
      column: DataTypes.INTEGER,
      section: DataTypes.STRING,
      row: DataTypes.INTEGER,
      ddc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
