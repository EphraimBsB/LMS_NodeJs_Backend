module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      roll_number: {
        type: Sequelize.STRING,
      },
      course: {
        type: Sequelize.STRING,
      },
      degree: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        default: "student",
        enum: ["librarian", "student", "admin"],
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
  down: async (queryInterface) => {
    await queryInterface.dropTable("Users");
  },
};
