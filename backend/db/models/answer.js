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
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull:false
    }
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: "userId" })
    Answer.belongsTo( models.Question, { foreignKey: "questionId"})
    Answer.hasMany(models.Vote, { foreignKey: "answerId" })
  };
  return Answer;
};