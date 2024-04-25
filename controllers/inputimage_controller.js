const db = require("../common/database");

exports.inputimage = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  res.render("inputimage");
};

exports.inputimagePost = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  var emotion = req.session.prediction;
  var newUser = req.session.newUser;

  if (emotion == "Neutral" || newUser) {
    return res.redirect("/genreSelection");
  } else {
    return res.redirect("/movieRec");
  }
};
