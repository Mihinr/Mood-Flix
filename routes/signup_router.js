var express = require("express");
var router = express.Router();

const signup_Controller = require('../controllers/signup_controller');

router.get('/signup', signup_Controller.signup);
router.post('/signup', signup_Controller.signUpPost);



module.exports = router;