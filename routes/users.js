var express = require('express');
var router = express.Router();
var db = require('../database');


router.get('/list', function (req, res, next) {
  var sql = 'SELECT * FROM users';
  db.query(sql, function (err, data, fields) {
    if(data.length <= 0)
    message = "Profile not found!";

    res.render('list', { title: 'User List', userData: data, });
  });
});


module.exports = router;
