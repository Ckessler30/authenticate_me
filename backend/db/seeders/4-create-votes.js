'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Votes', [
        {
        userId: 8,
        questionId: 19,
        voteStatus: true
      },
        {
        userId: 8,
        answerId: 11,
        voteStatus: false
      },
        {
        userId: 9,
        questionId: 20,
        voteStatus: true
      },
        {
        userId: 10,
        answerId: 12,
        voteStatus: true
      },
        {
        userId: 9,
        answerId: 12,
        voteStatus: true
      },
        {
        userId: 8,
        answerId: 12,
        voteStatus: true
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Votes', null, {});
  }
};
