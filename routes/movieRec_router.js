var express = require("express");
var router = express.Router();

const movieRec_Controller = require('../controllers/movieRec_controller');

router.get('/movieRec',movieRec_Controller.movieRec);



module.exports = router;