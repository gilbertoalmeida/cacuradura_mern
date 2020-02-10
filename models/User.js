const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pictures: {
    type: Array,
    default: [
      "https://lh3.googleusercontent.com/Y9MEA5YtTlLOwRIgs4cfY3Pse-EfYRcWiDOsmivp0LafJeQZ263EQPiA4AP713vMDRYq72O_cjP5gUA5O3dkOhRL9B5upbg8giFsYPFXuX515v7F0N3O353cZMygXD5HEUcHRpK9cyt9iAuYYr-fT05sQm11RU3Y2-GZ7SdKnmzYK9g7xdM86_WyxQ-xUBe38GMRe30YFZ90bPkxoCCmc2uPw4hoskj5FKEyzH9562MKwf92qBsLnaJO76USb3z6ihoNSCpgyDP6qeHc-UFDNLIKoHP-rLdxzhjF8bwznMgQ0XlNmGuoI8Z9WrZUd_86AKAHttzO224b8_3WRryEE40hZOK4LY-PXN6SfpwRaN_0bNuQvlQ1zYoUgKtgKu0CbUVHD0XeOnyBh4sVpvgIoleK9oXs2MAxFLfUG4Coo_F-bzdLV_C7A2DhmBMR3CatnseED7WD6jR4s0BYCmdOE33HCVec_reqwXAGUAaef-TgJd4BU1s-6xCfXrJ6elHZE_Q_domcCPcKxpprzhIqoc0uBOJa8lfG1nqkSUYjsnkzWrqY26k915t7EDaseHORBD-VHOmscz88J3VoPxqsff-Pcj0Ce0bLszXYJVkzEAmt_6HLxh3uFVqyAWQDsZl7Al2Cp1u9V9NZknC0KCxq3RxASsi7AAKCKfa2Mih1qYdVOYIflY_BEQ=w471-h672-no"
    ],
    required: true
  }
});

//some fields to add in the future: likes, tags, comments.
//a last edited, that will be by default null, but updated to the date.now everytime the user
//updates. Aí no component dos artigos eu vou mostrar só a data, mas se o last edited nao for null
//mostra tb o last edited

let User = (module.exports = mongoose.model("User", userSchema));
