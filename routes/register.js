var express = require('express');
var router = express.Router();
var db = require('../database');
var db = require('../database');
const path = require('path');
const multer = require('multer');
const imageurl='public/images/uploaded_images/';
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, imageurl)
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
router.get('/', function (req, res, next) {
    res.render('register',);   
});

// router.post('/registers', function (req, res, next) {
    
//         const userDetails = req.body;
//         console.log("userDetails",userDetails)
        
//         var sql = 'INSERT INTO register SET ?';
//         db.query(sql, userDetails, function (err, data) {
//             if (err)
//             {
//                 throw err;
//             } 
//             else{
//                 console.log("User Registeration  is  successfully ");
//                 req.flash('success', 'Your login is successfully!!');
//                 res.redirect('/home');
          
//             }
          
//         });
        
//     });
//     router.get('/home',(req,res)=>{
//         res.render('home');
//     });

router.post('/registers', upload.single('image'), function (req, res, next) {
    
   
    var username = req.body.username;

	var email = req.body.email;

	var mobile = req.body.mobile;

	var birth = req.body.birth;

    var password = req.body.password;

    if (!req.file) {
        console.log("No file upload");
    }
    else{
        console.log(req.file.filename)
        var imgsrc = req.file.filename;
        var query = `
	INSERT INTO register (username, email, mobile, birth,password,image) VALUES ("${username}", "${email}", "${mobile}", "${birth}", "${password}", "${imgsrc}")`;

db.query(query,imgsrc, function(error, result){

		if(error)
		{
			throw error;
		}	
		else
		{
			res.redirect("/home"+result.insertId);
		}

	});

    }
	
});


router.get('/home', (req, res) => {
    res.render('home');
});
module.exports = router;


