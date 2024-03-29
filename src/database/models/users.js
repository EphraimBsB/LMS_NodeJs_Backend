"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Books, Loans }) {
      this.hasMany(Loans, {
        foreignKey: "userId",
        onDelete: "CASCADE",
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
      course: DataTypes.STRING,
      degree: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        default: "student",
        enum: ["librarian", "student", "lecturer", "guest","admin"],
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
