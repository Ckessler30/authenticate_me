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

  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    Question.belongsTo(models.User, { foreignKey: "userId"})
    Question.hasMany(models.Answer, { foreignKey: "questionId", onDelete: "cascade", hooks: true})
    Question.hasMany(models.Vote, { foreignKey: "questionId", onDelete: "cascade"})
  };
  return Question;
};