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
            userId: 1,
            title: "How does everyone tie their shoes??",
            questionText: "Literally have no clue how to tie my shoes",
            questionImg:
              "https://www.childrenstherapyteam.com/wp-content/uploads/2017/12/Shoe-tying.jpg",
          },
          {
            userId: 2,
            title: "How do I drive a car blind?",
            questionText:
              "I have been having trouble driving my car lateley and need help please",
            questionImg:
              " https://di-uploads-pod19.dealerinspire.com/sussmanacura/uploads/2019/11/driving-school-4.jpg",
          },
          {
            userId: 2,
            title: "How does everyone make their oatmeal?",
            questionText: "Looking for new oatmeal recipes",
            questionImg:
              "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2019%2F07%2F27114300%2Foatmeal.jpg",
          },
          {
            userId: 1,
            title: "What makes you smile?",
            questionText: "Answer with some good pics",
            questionImg:
              "https://sites.psu.edu/siowfa16/files/2016/10/YeDYzSR-10apkm4.png",
          },
          {
            userId: 2,
            title: "What are the cutest dog breeds?",
            questionText: "Looking to get a dog",
            questionImg:
              "https://i.barkpost.com/wp-content/uploads/2015/04/husky.jpg?q=70&fit=crop&crop=entropy&w=808&h=500",
          },
          {
            userId: 2,
            title: "Whats your favorite marvel movie?",
            questionText: "right answers only",
            questionImg:
              "https://www.denofgeek.com/wp-content/uploads/2021/09/marvel-avengers.jpg?resize=768%2C432",
          },
          {
            userId: 2,
            title: "Whats your favorite star wars movie?",
            questionText: "7-9 don't count",
            questionImg:
              "https://lumiere-a.akamaihd.net/v1/images/hb_disneyplus_skywalkersaga_mobile_19267_e964ed2c.jpeg?region=0,0,640,400",
          },
          {
            userId: 2,
            title: "Who is your favorite NFL players and moments?",
            questionText: "Send some links to clips in here",
            questionImg:
              "https://www.nbcsports.com/sites/rsnunited/files/article/hero/Taylor_S_USATSI_2390021.jpg",
          },
          {
            userId: 2,
            title:
              "How many licks does it take to get to the center of a tootsie pop?",
            questionText: "cmon",
            questionImg:
              "https://popicon.life/wp-content/uploads/2018/04/169tootsiepop.jpg",
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
