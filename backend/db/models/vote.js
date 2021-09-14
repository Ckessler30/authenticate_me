'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    voteStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, { foreignKey: "userId"})
    Vote.belongsTo(models.Question, { foreignKey: "questionId"})
    Vote.belongsTo(models.Answer, { foreignKey: "answerId" })
    Vote.belongsTo(models.Comment, { foreignKey: "commentId"})
  };
  return Vote;
};