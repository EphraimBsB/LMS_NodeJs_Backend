"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Loans, Location }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        targetKey: "id",
      });

      this.hasOne(Loans, {
        foreignKey: "bookId",
        onDelete: "cascade",
      });

      this.hasOne(Location, {
        foreignKey: "bookId",
        onDelete: "cascade",
      });
    }
  }
  Books.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      ddc: DataTypes.STRING,
      title: DataTypes.TEXT,
      author: DataTypes.TEXT,
      acc_number: DataTypes.STRING,
      image: DataTypes.STRING,
      category: DataTypes.ENUM(
        "Computer",
        "Engineering",
        "Business",
        "General",
        "Projects",
        "Indian"
      ),
      status: DataTypes.ENUM(
        "available",
        "unavailable",
        "reserved",
        "borrowed"
      ),
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
