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
      acc_num: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      copies: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.STRING,
      },
      subjects: {
        type: Sequelize.STRING,
      },
      pub_year: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(
          "Available",
          "Unavailable",
          "Reserved",
          "Borrowed"
        ),
        defaultValue: "Available",
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
