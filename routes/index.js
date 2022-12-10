var express = require('express');
var router = express.Router();
var db = require('../database');

const path = require('path');
const multer = require('multer');
const imageurl='public/images/uploaded_images/';
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, imageurl);
  },
  filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage});
 

router.get('/edit/:id', function (req, res, next) {
  var UserId = req.params.id;
  var sql = `SELECT * FROM users WHERE id= ${UserId}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
    console.log("data", data)
    db.query("SELECT DISTINCT state FROM users where state !=''  ORDER BY state ASC", function (error, state) {
      if (err) throw err;

      db.query(`SELECT DISTINCT city from users where state = '${data[0].state}'ORDER BY city ASC`, function (error, cities,) {
        if (err) throw err;
        console.log("selected state is ", data[0].state)
        console.log("selected city is ", data[0].city)
        console.log("selected image is ", data[0].image)
        console.log("state is ", state)
        console.log("cities is ", cities)
        console.log("editdata", data[0])
        res.render('index', { title: 'User List', editData: data[0], message: req.flash('success','error'), selected_country: data[0].state, selected_city: data[0].city, state_data: state, city_data: cities });


      });
    });
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

  db.query(query, function (error, value) {
    var data_arr = [];
    value.forEach(function (row) {
      data_arr.push(row.Data);
    });
    response.json(data_arr);
  });
});


router.post('/edit/:id', upload.single('image'), function (req, res, next) {
  var id = req.params.id;
  var updateData = req.body;
  console.log('------------> hii', updateData);

  
  var sql = `UPDATE users SET ? WHERE id= ?`;
  console.log('------------>updateData', sql);
  
  db.query(sql, [updateData, id,], function (err, data) {
    if (err) {
      throw err;
     
    }
    else {
      req.flash('success', 'Your data is edited successfully!!');
      res.redirect('/users/list');
    }
  });
});

router.get('/users/list', (req, res) => {
  res.render('list');
});

router.get('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], function (err, data) {
    if (err) {
      throw err;
    }
    else {
      console.log(data.affectedRows + " record(s) updated");
      req.flash('success', 'Your data is deleted!!');
      res.redirect('/users/list');
    }
  });
});

router.get('/users/list', (req, res) => {
  res.render('list');
});
module.exports = router;

