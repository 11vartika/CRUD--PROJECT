var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/forms', function (req, res, next) {
    res.render('contact', { title: 'User List' });
   
});

router.post('/contacts', function (req, res, next) {  
    const userDetails = req.body;  
    var sql = 'INSERT INTO contact SET ?';
    db.query(sql, userDetails, function (err, data) {
        if (err)
        {
            throw err;
        }
       else{
        console.log("User data is inserted successfully ");        
        req.flash('success', 'Your details is saved successfully!!');
        res.redirect('/');
       }       
    }); 
});
router.get('/',(req,res)=>{
    res.render('home');
});
module.exports = router;


