var express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var multer = require('multer'); // Import multer middleware
var app = express();
const session = require("express-session");
const FormData = require('form-data'); // Import FormData module

var signupRouter = require("./routes/signup_router");
var loginRouter = require("./routes/login_router");
var inputimageRouter = require("./routes/inputimage_router");
var movieRecRouter = require("./routes/movieRec_router");
var genreSelectionRouter = require("./routes/genreSelection_router");

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

// Configure multer to handle file uploads
var upload = multer();

// Route to forward image data to Flask app for emotion detection
app.post('/predict/emotion', upload.single('image'), async function(req, res) {
  try {
    const { default: fetch } = await import('node-fetch'); // Dynamic import
    const form = new FormData();
    form.append('image', req.file.buffer, { filename: req.file.originalname });

    fetch('http://127.0.0.1:5000/predict/emotion', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to process emotion detection' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process emotion detection' });
  }
});

app.post("/input", async (req, res) => {
  try {
    const prediction = req.body.prediction; // Access prediction from request body
    req.session.prediction = prediction;

    // Optionally send a response back to EJS for confirmation
    res.json({ message: "Prediction received successfully!" });
  } catch (error) {
    console.error("Error processing prediction:", error);
    res.status(500).json({ message: "Error processing prediction" });
  }
});


// Use input image router for handling image capture from webcam
app.use("/inputimage", inputimageRouter);

app.get("/inputimage", inputimageRouter);
app.post("/inputimage", inputimageRouter);

// Other routes
app.get("/signup", signupRouter);
app.post("/signup", signupRouter);
app.get("/login", loginRouter);
app.post("/login", loginRouter);
app.get("/genreSelection", genreSelectionRouter);
app.post("/genreSelection", genreSelectionRouter);
app.get("/movieRec", movieRecRouter);
app.post("/movieRec", movieRecRouter);
app.get("/thankyou",movieRecRouter);

module.exports = app;
