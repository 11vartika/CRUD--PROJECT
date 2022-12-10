var express = require('express');
var router = express.Router();
var db = require('../database');
const path = require('path');
const multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images/uploaded_images/')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
router.get('/', function (req, res, next) {
    var sql = 'SELECT * FROM users';
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
  
      res.render('images', { title: 'User List', userData: data, });
    });

});
router.post('/uploading', upload.single('image'),function(req,res,next){
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var last_name = post.user_pass;
        var nrii = post.nri;
        var addre = post.address;
     
        var card = post.postal
        console.log("post", post);
    }
    if (!req.file) {
        console.log("No file upload");
    }
    else {
        console.log(req.file.filename)
        var imgsrc = req.file.filename
        var sql = "INSERT INTO images(`user_name`,`user_pass`,`nri`,`address`,`postal`,`image`) VALUES ('" + name + "','" + last_name + "','" + nrii + "','" + addre + "','" + card + "','" + imgsrc + "')";
        db.query(sql, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
            console.log("data inserted ");
            req.flash('success', 'Your details is saved successfully!!');
            res.redirect('/images'+result.insertId);
        })
    }
})
router.get('/images', (req, res) => {
    res.render('images');
});


module.exports = router;