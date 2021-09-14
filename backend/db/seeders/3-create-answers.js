'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert(
        "Answers",
        [
          {
            userId: 1,
            questionId: 1,
            answerText:
              "Hey I see this question is pretty unordinary, are you under the age of 3?",
            answerImg: "https://pbs.twimg.com/media/EWOtJT5WsAgq-Pg.jpg",
          },
          {
            userId: 1,
            questionId: 2,
            answerText:
              "Hey, you probably should not be asking for driving advice on a questions website",
            answerImg:
              "https://manofmany.com/wp-content/uploads/2021/06/Hasbulla-Magomedov-4-1200x800.jpg",
          },
          {
            userId: 2,
            questionId: 3,
            answerText: "You could alwasy just eat the oatmeal dry, lol",
            answerImg:
              "https://s3.getstickerpack.com/storage/uploads/sticker-pack/eric-cartman-south-park/tray_large.png?c41522191bbd5279ae55b2b70dd4cc78",
          },
          {
            userId: 3,
            questionId: 2,
            answerText:
              "Come on man, you really dont know how to tie your shoes?? but you can type on a forum??",
            answerImg:
              "https://imgix.bustle.com/uploads/image/2020/6/3/49ba04c2-3c4f-487e-9d2c-2bbd73cf2c2b-thor-endgame.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
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
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
