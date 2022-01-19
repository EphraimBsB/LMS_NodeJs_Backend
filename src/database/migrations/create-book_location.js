"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
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
      section: {
        type: Sequelize.STRING,
      },
      row: {
        type: Sequelize.INTEGER,
      },
      ddc: {
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
    await queryInterface.dropTable("Locations");
  },
};
