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
        type: Sequelize.STRING,
        foreignKey: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      },
      bookAccNo: {
        type: Sequelize.STRING,
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
        type: Sequelize.ENUM("Processing", "Borrowed", "Overdue", "Returned"),
        defaultValue: "Processing",
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
