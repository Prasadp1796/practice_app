const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express 1'});
});

//Method To Render Blank Page
router.get('/blank', function (req, res) {
    res.render("Blank/index");
});

module.exports = router;
