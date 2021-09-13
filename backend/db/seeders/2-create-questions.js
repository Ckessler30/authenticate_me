'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert(
        "Questions",
        [
          {
            userId: 8,
            title: "How to tie your shoes",
            questionText:
              "I have been having trouble tying my shoes lateley and need help please",
            questionImg:
              "https://www.childrenstherapyteam.com/wp-content/uploads/2017/12/Shoe-tying.jpg",
          },
          {
            userId: 9,
            title: "How do I drive a car?",
            questionText:
              "I have been having trouble driving my car lateley and need help please",
            questionImg:
              " https://di-uploads-pod19.dealerinspire.com/sussmanacura/uploads/2019/11/driving-school-4.jpg",
          },
          {
            userId: 10,
            title: "How to make oatmeal",
            questionText:
              "I have been having trouble making oatmeal lateley and need help please",
            questionImg:
              "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F07%2F27114300%2Foatmeal.jpg",
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
      return queryInterface.bulkDelete('Questions', null, {});
  }
};
