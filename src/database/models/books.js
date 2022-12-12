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
    }
  }
  Books.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      ddc: DataTypes.STRING(20),
      acc_num: DataTypes.STRING(50),
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.TEXT,
      copies: DataTypes.STRING(6),
      stock: DataTypes.STRING(6),
      image: DataTypes.STRING,
      subjects: DataTypes.STRING(20),
      publisher: DataTypes.STRING(50),
      pub_year: DataTypes.STRING(10),
      ebook: DataTypes.STRING,
      editions: DataTypes.STRING(20),
      categories: DataTypes.STRING(10),
      isbn: DataTypes.STRING(20),
      source: DataTypes.STRING(10),
      from: DataTypes.STRING(100),
      type: DataTypes.ENUM("Physical", "E-book"),
      status: DataTypes.ENUM(
        "Available",
        "Unavailable",
        "Reserved",
        "Borrowed"
      ),
      location: DataTypes.STRING(20),
      shelf: DataTypes.STRING(5),
      side: DataTypes.STRING(10),
      column: DataTypes.TINYINT,
      row: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Books",
    }
  );
  return Books;
};
