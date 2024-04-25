var express = require("express");
var router = express.Router();

const movieRec_Controller = require('../controllers/movieRec_controller');

router.get('/movieRec',movieRec_Controller.movieRec);
router.post('/movieRec',movieRec_Controller.movieRecPost);
router.get('/thankyou', movieRec_Controller.thankYou);

module.exports = router;