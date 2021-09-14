'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Answers', [
        {
        userId: 1,
        questionId: 1,
        answerText: "Hey I see this question is pretty unordinary, are you under the age of 3?"
      },
        {
        userId: 1,
        questionId: 2,
        answerText: "Hey, you probably should not be asking for driving advice on a questions website"
      },
        {
        userId: 2,
        questionId: 3,
        answerText: "You could alwasy just eat the oatmeal dry, lol"
      },
        {
        userId: 3,
        questionId: 2,
        answerText: "Come on man, you really dont know how to tie your shoes?? but you can type on a forum??"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
