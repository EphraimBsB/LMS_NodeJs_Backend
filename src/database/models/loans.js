"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Books }) {
      Loans.belongsTo(User, {
        foreignKey: "userID",
        targetKey: "roll_number",
        onDelete: "CASCADE",
      });
      Loans.belongsTo(Books, {
        foreignKey: "bookId",
        targetKey: "id",
        onDelete: "CASCADE",
      });
    }
  }
  Loans.init(
    {
      userId: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      bookAccNo: DataTypes.STRING,
      issueDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      returnDate: DataTypes.BOOLEAN,
      status: DataTypes.ENUM("Processing", "Borrowed", "Overdue", "Returned"),
    },
    {
      sequelize,
      modelName: "Loans",
    }
  );
  return Loans;
};
