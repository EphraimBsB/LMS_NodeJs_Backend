"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Books, Loans }) {
      this.hasMany(Loans, {
        foreignKey: "userId",
        onDelete: "cascade",
      });

      this.hasMany(Books, {
        foreignKey: "userId",
        onDelete: "RESTRICT",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      roll_number: DataTypes.STRING,
      roll_number: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        default: "student",
        enum: ["librarian", "student", "admin"],
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
