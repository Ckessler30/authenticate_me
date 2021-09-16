'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId"})
    Comment.belongsTo(models.Answer, { foreignKey: "userId"})
    Comment.hasMany(models.Vote, { foreignKey: "commentId"})
  };
  return Comment;
};