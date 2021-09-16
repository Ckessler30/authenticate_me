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
        userId: 1,
        questionId: 2,
        voteStatus: true
      },
        {
        userId: 1,
        answerId: 1,
        voteStatus: false
      },
        {
        userId: 2,
        questionId: 3,
        voteStatus: true
      },
        {
        userId: 2,
        answerId: 3,
        voteStatus: true
      },
        {
        userId: 2,
        answerId: 4,
        voteStatus: true
      },
        {
        userId: 1,
        answerId: 3,
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
