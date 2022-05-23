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
      title: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      pub_year: {
        type: Sequelize.STRING,
      },
      ddc: {
        type: Sequelize.STRING,
      },
      acc_num: {
        type: Sequelize.STRING,
      },
      subjects: {
        type: Sequelize.STRING,
      },
      copies: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.STRING,
      },
      ebook: {
        type: Sequelize.STRING,
      },
      image: {
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
      shelf: {
        type: Sequelize.STRING,
      },
      side: {
        type: Sequelize.STRING,
      },
      column: {
        type: Sequelize.INTEGER,
      },
      row: {
        type: Sequelize.INTEGER,
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
