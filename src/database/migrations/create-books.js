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
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      publisher: {
        type: Sequelize.STRING(50),
      },
      pub_year: {
        type: Sequelize.STRING(20),
      },
      editions: {
        type: Sequelize.STRING(20),
      },
      ddc: {
        type: Sequelize.STRING(100),
      },
      isbn: {
        type: Sequelize.STRING(20),
      },
      acc_num: {
        type: Sequelize.STRING,
      },
      categories: {
        type: Sequelize.STRING(10),
      },
      subjects: {
        type: Sequelize.STRING(50),
      },
      copies: {
        type: Sequelize.STRING(5),
      },
      stock: {
        type: Sequelize.STRING(5),
      },
      source: {
        type: Sequelize.STRING(20),
      },
      from: {
        type: Sequelize.STRING(100),
      },
      type: {
        type: Sequelize.ENUM("Physical", "E-book","Physical&E-book"),
        defaultValue: "Physical",
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
        type: Sequelize.STRING(5),
      },
      side: {
        type: Sequelize.STRING(10),
      },
      column: {
        type: Sequelize.TINYINT,
      },
      row: {
        type: Sequelize.TINYINT,
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
