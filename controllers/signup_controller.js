const { check, validationResult } = require("express-validator");
const db = require("../common/database");
const utils = require("../common/utils");

exports.signup = (req, res) => {
    res.render("signup");
  };

  exports.signUpPost = (req, res) => {
    var message = "";
    const errors = validationResult(req);
    var post = req.body;
  

    var email = post.email;
    email = email.trim();
    var password = post.password;
    password = password.trim();
  
    var userid = 0;
    var encryptedpwd = "";
  
    if (!errors.isEmpty()) {
      const validationMessage = errors.array();
      res.render("signup", { message, userDetails: "", validationMessage });
    } else {
      var encryptedpwd = utils.getEncrptedValue(password);
      var connection = db.getMySQLConnection();
      connection.connect();
      connection.query(
       "Select userid from Users where email = ?",
        [email],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send(err.stack);
            return;
          }
          if (result.length > 0) {
            message = email + ", Email already exists!";
            res.render("signup", { message, userDetails: "" });
          } else {
            connection.query(
              "Insert into MoodFlix.Users (email, password) values (?,?)",
              [email, encryptedpwd],
              (err, rows) => {
                if (err) {
                  res.send(err.stack);
                } else {
                  userid = rows.insertId;
                  req.session.userid = userid;
                  req.session.newUser = 1;
                  connection.end();
                  res.redirect("/inputimage");
                }
              }
            );
           
          }
        }
      );
    }
  };
  