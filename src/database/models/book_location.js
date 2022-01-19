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
        onDelete: "CASCADE",
      });
    }
  }
  Location.init(
    {
      bookId: DataTypes.INTEGER,
      shelf: DataTypes.STRING,
      side: DataTypes.STRING,
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
