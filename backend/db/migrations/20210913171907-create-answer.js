'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Answers", {
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
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Questions" },
      },
      answerText: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    return queryInterface.dropTable('Answers');
  }
};