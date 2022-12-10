var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/profile/:id', function (req, res, next) {
    var id = req.params.id;
    var sql="SELECT * FROM `images` WHERE `id`='"+id+"'"; 
    db.query(sql, function(err, result){
        if(result.length <= 0)
        message = "Profile not found!";
      
      res.render('picture',{data:result,});
   });
});

module.exports = router;