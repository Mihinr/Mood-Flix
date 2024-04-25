const utils = require("../common/utils");
const db = require("../common/database");

exports.login = (req, res) => {
  res.render("login");
};

exports.loginPost = (req, res) => {
  let message;
  const post = req.body;
  const email = post.email;
  const password = post.password;

  if (email && password) {
    const connection = db.getMySQLConnection();

    if (!connection) {
      res.send("Something went wrong while retrieving database credentials");
      return;
    }

    connection.connect();

    // Check user table
    connection.query(
      "select * from Users where email = ?",
      [email],
      (err, rows) => {
        if (err) {
          res.send(err.stack);
        } else {
          if (rows.length) {
            const userid = rows[0].userId;
            const pwdFromDb = rows[0].password;
            const decryptedValue = utils.getDecrptedValue(pwdFromDb);
            req.session.userid = userid;

            if (decryptedValue == password) {
              res.redirect("/inputimage");
              connection.end();
              return;
            } else {
              message = "Incorrect Password";
              res.render("login", { message: "Incorrect Password" });
              connection.end();
              return;
            }
          }
        }
      })
    } else {
      res.send("Email and password required!");
    }
  };