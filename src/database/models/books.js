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
      description: DataTypes.TEXT,
      acc_number: DataTypes.STRING,
      copies: DataTypes.INTEGER,
      image: DataTypes.STRING,
      category: DataTypes.STRING,
      status: DataTypes.ENUM(
        "Available",
        "Unavailable",
        "Reserved",
        "Borrowed"
      ),
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
