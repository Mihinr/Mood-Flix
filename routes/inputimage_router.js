var express = require("express");
var router = express.Router();

const inputimage_controller = require('../controllers/inputimage_controller');
// const emotionRecognition = require('../controllers/app.py');

router.get('/inputimage', inputimage_controller.inputimage);
router.post('/inputimage', inputimage_controller.inputimagePost);
// router.get('/inputimage', emotionRecognition);



module.exports = router;