var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var app = express();
const session = require("express-session");

var loginRouter = require("./routes/login_router");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.get("/health", loginRouter);

module.exports = app;