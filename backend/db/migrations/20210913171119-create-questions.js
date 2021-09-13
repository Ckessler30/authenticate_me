'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      questionText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      questionImg: {
        type: Sequelize.TEXT,
      },
      votes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  }
};