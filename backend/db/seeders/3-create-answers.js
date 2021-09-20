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
              "https://m.media-amazon.com/images/I/61CjAoa2jvS._SL1500_.jpg",
          },
          {
            userId: 2,
            questionId: 3,
            answerText: "Peanut butter and jelly oats",
            answerImg:
              "https://s3.getstickerpack.com/storage/uploads/sticker-pack/eric-cartman-south-park/tray_large.png?c41522191bbd5279ae55b2b70dd4cc78",
          },
          {
            userId: 2,
            questionId: 3,
            answerText: "Brotein oats",
            answerImg:
              "https://m.media-amazon.com/images/I/81tmWFvt8VL._AC_SY550_.jpg",
          },
          {
            userId: 1,
            questionId: 4,
            answerText: "puppies",
            answerImg:
              "https://patch.com/img/cdn20/shutterstock/24892379/20210323/112250/styles/patch_image/public/shutterstock-1048123303___23111859337.jpg",
          },
          {
            userId: 2,
            questionId: 4,
            answerText: "FOOOOOD",
            answerImg:
              "https://www.washingtonian.com/wp-content/uploads/2021/07/2Fiftys-1500x1000.jpg",
          },
          {
            userId: 2,
            questionId: 5,
            answerText: "German shepherds",
            answerImg:
              "https://www.yourpurebredpuppy.com/dogbreeds/photos2-G/german-shepherd-05.jpg",
          },
          {
            userId: 1,
            questionId: 5,
            answerText: "Alaskan Malamutes",
            answerImg:
              "https://www.rover.com/blog/wp-content/uploads/2020/03/two-malamute-puppies-flickr.jpg",
          },
          {
            userId: 2,
            questionId: 6,
            answerText: "Thor Ragnarok",
            answerImg:
              "https://media.vanityfair.com/photos/59f10041a923ff0fd178ca84/5:3/w_1285,h_771,c_limit/Thor-Ragnarok-Review.jpg",
          },
          {
            userId: 2,
            questionId: 6,
            answerText: " maybe EndGame",
            answerImg:
              "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2019%2F04%2Fscreencapture-file-C-Users-JckNa-OneDrive-Desktop-b-avengersendgame-horizontal-friday-17793-04d92fbf-webp-2019-04-23-08_14_14.jpg",
          },
          {
            userId: 1,
            questionId: 6,
            answerText: "Spoderman",
            answerImg:
              "https://i.kym-cdn.com/photos/images/newsfeed/001/286/506/751.jpg",
          },
          {
            userId: 1,
            questionId: 7,
            answerText: "Revenge of the Sith",
            answerImg:
              "https://www.syfy.com/sites/syfy/files/wire/legacy/revengeofthesith.jpg",
          },
          {
            userId: 2,
            questionId: 7,
            answerText: "Definitley return of the jedi",
            answerImg:
              "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2020%2F06%2F11%2FEwok.jpg",
          },
          {
            userId: 2,
            questionId: 8,
            answerText: "The Predator Chase Young!!",
            answerImg:
              "https://i.pinimg.com/736x/0c/12/49/0c12492f5d219464c0d2d2ec7d839f66.jpg",
          },
          {
            userId: 1,
            questionId: 8,
            answerText: "Bam Bam Kam Chancellor",
            answerImg:
              "https://nflspinzone.com/wp-content/uploads/getty-images/2018/08/461308908.jpeg",
          },
          {
            userId: 1,
            questionId: 9,
            answerText: "2",
            answerImg: "https://i.ytimg.com/vi/4Qto049GEkA/maxresdefault.jpg",
          },
          {
            userId: 1,
            questionId: 9,
            answerText: "1 million",
            answerImg:
              "https://ourfitpets.com/wp-content/uploads/2021/01/Dog-Ate-a-Lollipop.jpg",
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
