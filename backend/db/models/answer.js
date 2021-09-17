'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    answerImg: {
      type: DataTypes.TEXT,
    },
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: "userId" })
    Answer.belongsTo( models.Question, { foreignKey: "questionId"})
    Answer.hasMany(models.Vote, { foreignKey: "answerId" })
    Answer.hasMany(models.Comment, { foreignKey: "answerId" })
  };
  return Answer;
};