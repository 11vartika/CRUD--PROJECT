var express = require('express');
var router = express.Router();
var db = require('../database');
let pdf = require("html-pdf");
var options = { format: 'Letter' };




router.get("/generate", (req, res) => {

    var sql = 'SELECT * FROM users';
    const date = new Date().toISOString().slice(0, 10);
        const [yyyy, mm, dd] = date.split('-');
        const formattedDate = `${dd}/${mm}/${yyyy}`;
        console.log(formattedDate);
    db.query(sql, function (err, data, fields) {
        res.render('template', { userData: data, },function(err, str) {
            if (err) return res.send(err);
        
     
            pdf.create(str).toFile("report.pdf", function(err, data) {
              if (err) return res.send(err);
        
            //   res.send("File created successfully");
            res.redirect('/users/list');
            req.flash('success', 'File created successfully!!');
            });
          });
    });
  });
  router.get('/users/list',(req,res)=>{
    res.render('list');
  });
  router.get("/generate_pdf/:id", (req, res) => {

    var UserId = req.params.id;
    var sql = `SELECT * FROM users WHERE id= ${UserId}`;
    const date = new Date().toISOString().slice(0, 10);
    const [yyyy, mm, dd] = date.split('-');
    const formattedDate = `${dd}/${mm}/${yyyy}`;
    console.log(formattedDate);
    db.query(sql, function (err, data, fields) {
        res.render('template', { userData: data, },function(err, str) {
            if (err) return res.send(err);
        
         
            pdf.create(str).toFile("employees.pdf", function(err, data) {
              if (err) return res.send(err);
        
            //   res.send("File created successfully");
            res.redirect('/users/list');
            req.flash('success', 'File created successfully!!');
            });
          });
    });
  });
module.exports = router;