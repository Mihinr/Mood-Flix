var express = require("express");
var router = express.Router();

const genreSelection_Controller = require('../controllers/genreSelection_controller');

router.get('/genreSelection', genreSelection_Controller.genreSelection);
router.post('/genreSelection', genreSelection_Controller.genreSelectionPost);

module.exports = router;