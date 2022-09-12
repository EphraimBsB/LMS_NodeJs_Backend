'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('New_Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      new_copies: {
        type: Sequelize.STRING(5)
      },
      new_acc_num: {
        type: Sequelize.STRING(50)
      },
      source: {
        type: Sequelize.STRING(10)
      },
      from: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('New_Stocks');
  }
};