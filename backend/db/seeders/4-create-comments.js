'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert(
        "Comments",
        [
          {
            userId: 1,
            answerId: 1,
            commentText: "This answer was really helpful",
          },
          {
            userId: 1,
            answerId: 2,
            commentText: "Awesome man",
          },
          {
            userId: 2,
            answerId: 1,
            commentText: "Great answer!",
          },
          {
            userId: 1,
            answerId: 3,
            commentText: "Easily the best",
          },
          {
            userId: 2,
            answerId: 4,
            commentText: "Woahhhh Wut tha",
          },
          {
            userId: 2,
            answerId: 5,
            commentText: "this is prob number 1 for most people",
          },
          {
            userId: 1,
            answerId: 6,
            commentText: "GIMME",
          },
          {
            userId: 1,
            answerId: 7,
            commentText: "Agree 10000% I want one",
          },
          {
            userId: 2,
            answerId: 8,
            commentText: "so Damn fluffy",
          },
          {
            userId: 1,
            answerId: 9,
            commentText: "Agree with this one",
          },
          {
            userId: 1,
            answerId: 10,
            commentText: "but its so sad:(",
          },
          {
            userId: 2,
            answerId: 12,
            commentText: "ywtcoiwstywdtsnjtbbttfnliid",
          },
          {
            userId: 1,
            answerId: 13,
            commentText: "ewoks ftw",
          },
          {
            userId: 1,
            answerId: 14,
            commentText: "friggin animal DROY",
          },
          {
            userId: 2,
            answerId: 15,
            commentText: "top 3 hardest hitters ever",
          },
        ],
        {}
      );
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
