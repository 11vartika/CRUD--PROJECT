var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function (req, res, next) {
    res.render('editor', ); 
});

module.exports = router;