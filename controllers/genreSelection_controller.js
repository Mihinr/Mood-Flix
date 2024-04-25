const db = require("../common/database");

exports.genreSelection = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  res.render("genreSelection");
};

exports.genreSelectionPost = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  var genre = req.body.genre;
  req.session.genre = genre;

  res.redirect("/movieRec");
}