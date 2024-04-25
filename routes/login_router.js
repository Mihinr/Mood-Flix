var express = require('express');
var router = express.Router();

const login_controller = require('../controllers/login_controller');

router.get('/login', login_controller.login);
router.post('/login', login_controller.loginPost);

module.exports = router;