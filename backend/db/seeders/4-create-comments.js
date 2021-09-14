'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Comments', [
        {
          userId: 1,
          answerId: 1,
          commentText: "This answer was really helpful"
        },
        {
          userId: 1,
          answerId: 2,
          commentText: "Awesome man"
        },
        {
          userId: 2,
          answerId: 1,
          commentText: "Great answer!"
        },
        {
          userId: 3,
          answerId: 3,
          commentText: "Eh I disagree"
        },
        {
          userId: 3,
          answerId: 2,
          commentText: "Wut tha"
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
