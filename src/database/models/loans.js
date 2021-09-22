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
        targetKey: "id",
      });
      Loans.belongsTo(Books, {
        foreignKey: "bookId",
        targetKey: "id",
      });
    }
  }
  Loans.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      issueDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      returnDate: DataTypes.BOOLEAN,
      status: DataTypes.ENUM("inProgress", "overdue", "returned"),
    },
    {
      sequelize,
      modelName: "Loans",
    }
  );
  return Loans;
};
