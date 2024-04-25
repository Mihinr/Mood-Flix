const db = require("../common/database");
const {
  recommendMovies,
  content_recommendation,
} = require("./prediction_controller");

exports.movieRec = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  var emotion = req.session.prediction;
  var userid = req.session.userid;
  var newUser = req.session.newUser;
  var genre = req.session.genre;

  let dbRecordList = [];

  if (emotion == "Neutral" || newUser) {
    content_recommendation(userid, emotion, genre)
      .then((recommendations) => {
        if (recommendations.length > 0) {
          res.render("movieRec", { dbRecordList: recommendations });
        } else {
          res.render("noRecommendations");
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .send("An error occurred while fetching movie recommendations.");
      });
  } else {
    recommendMovies(userid, emotion, "")
      .then((recommendations) => {
        if (recommendations.length > 0) {
          res.render("movieRec", { dbRecordList: recommendations });
        } else {
          res.render("noRecommendations");
        }
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .send("An error occurred while fetching movie recommendations.");
      });
  }
};

exports.movieRecPost = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  var userid = req.session.userid;
  var emotion = req.session.prediction;

  // Get all movie ratings data from the request body
  const ratings = req.body;

  // Prepare a single query to insert all ratings
  let sql = "INSERT INTO MoodFlix.Ratings (userid, movieId, rating) VALUES ";
  let values = [];

  for (const movieId in ratings) {
    if (movieId.startsWith('rating_')) {
      let rating = ratings[movieId];
      values.push([userid, movieId.slice(7), rating]); // Extract movieId and rating
    }
  }

  // Flatten the values array
  let placeholders = values.map(() => "(?, ?, ?)").join(",");
  sql += placeholders;
  const flattenedValues = values.flat();

  var connection = db.getMySQLConnection();
  connection.connect();

  connection.query(sql, flattenedValues, (err, rows) => {
    if (err) {
      console.error(err.stack);
      return res.send(err.message);
    } else {
      console.log("Ratings inserted successfully!");
      connection.end();
      return res.redirect("/thankyou");
    }
  });
};


exports.thankYou = (req, res) => {
  if (!req.session || !req.session.userid) {
    return res.redirect("/login");
  }
  res.render("thankYou");
};
