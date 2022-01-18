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
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });

      this.hasOne(Loans, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
      });

      this.hasOne(Location, {
        foreignKey: "bookId",
        onDelete: "CASCADE",
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
      acc_num: DataTypes.STRING,
      title: DataTypes.TEXT,
      author: DataTypes.TEXT,
      description: DataTypes.TEXT,
      copies: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      subjects: DataTypes.STRING,
      pub_year: DataTypes.STRING,
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
