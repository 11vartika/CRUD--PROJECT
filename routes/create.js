var express = require('express');
var router = express.Router();
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
router.get('/form', function (req, res, next) {
    db.query("SELECT DISTINCT state FROM users where state !=''  ORDER BY state ASC", function (error, data) {

        res.render('create', { title: 'Create User Details ', country_data: data });

    });
});

router.get('/get_data', function (request, response, next) {

    var type = request.query.type;
    var search_query = request.query.parent_value;

    if (type == 'load_city') {
        var query = `
        SELECT DISTINCT city AS Data FROM users
        WHERE state = '${search_query}' 
        ORDER BY city ASC
        `;
    }

    db.query(query, function (error, data) {

        var data_arr = [];

        data.forEach(function (row) {
            data_arr.push(row.Data);
        });
        response.json(data_arr);
        // console.log("city", data);
    });
});

router.post('/created', upload.single('image'), function (req, res, next) {
    if (req.method == "POST") {
        var post = req.body;
        var name = post.user_name;
        var last_name = post.user_pass;
        var nrii = post.nri;
        var addre = post.address;
        var states = post.state;
        var cities = post.city;
        var card = post.postal
        console.log("post", post);
    }
    if (!req.file) {
        console.log("No file upload");
    }
    else {
        console.log(req.file.filename)
        var imgsrc = req.file.filename;
        var sql = "INSERT INTO users(`user_name`,`user_pass`,`nri`,`address`,`state`,`city`,`postal`,`image`) VALUES ('" + name + "','" + last_name + "','" + nrii + "','" + addre + "','" + states + "','" + cities + "','" + card + "','" + imgsrc + "')";
        db.query(sql, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
            console.log("data inserted ");
            req.flash('success', 'Your profile is created successfully!!');
            res.redirect('/users/list');
            
          
        })
    }
})



router.get('/users/list', (req, res) => {
    res.render('list');
});
module.exports = router;


