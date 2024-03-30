var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var app = express();
const session = require("express-session");


var signupRouter = require("./routes/signup_router"); // add router
var loginRouter = require("./routes/login_router"); 
var inputimageRouter = require("./routes/inputimage_router"); 
var movieRecRouter = require("./routes/movieRec_router"); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));


app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);


// add router
// app.get("/health", loginRouter);
app.get("/signup", signupRouter);
app.get("/login", loginRouter);
app.get("/inputimage", inputimageRouter);
app.get("/movieRec", movieRecRouter);


module.exports = app;