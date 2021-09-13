'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false
    },
    title: { 
      type: DataTypes.STRING(255),
      allowNull: false
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionImg: DataTypes.TEXT,
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }

  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: "userId"})
    Question.hasMany(models.Answer, { foreignKey: "questionId"})
    Question.hasMany(models.Vote, { foreignKey: "questionId"})
  };
  return Question;
};