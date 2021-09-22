"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Loans", {
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
      bookId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      issueDate: {
        type: Sequelize.DATE,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      returnDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.ENUM("inProgress", "overdue", "returned"),
        defaultValue: "inProgress",
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
    await queryInterface.dropTable("Loans");
  },
};
