"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      ddc: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.TEXT,
      },
      acc_number: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "available",
          "unavailable",
          "reserved",
          "borrowed"
        ),
        defaultValue: "available",
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Books");
  },
};
