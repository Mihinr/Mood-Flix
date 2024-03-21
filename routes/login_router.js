var express = require('express');
var router = express.Router();

const login_controller = require('../controllers/login_controller');

router.get('/health', login_controller.health);

module.exports = router;