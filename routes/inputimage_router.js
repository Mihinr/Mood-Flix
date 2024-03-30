var express = require("express");
var router = express.Router();

const inputimage_controller = require('../controllers/inputimage_controller');

router.get('/inputimage', inputimage_controller.inputimage);



module.exports = router;