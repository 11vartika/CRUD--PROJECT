var express = require('express');
var router = express.Router();
var db = require('../database');
var fast2sms = require('fast-two-sms');

const { response } = require('express');



router.get('/', function (req, res, next) {
    res.render('otp', ); 
});

router.post ('/sendMessage',async(req,res)=>{
    const response = await fast2sms.sendMessage({
        authorization :"0mGIJPWubtYlFASaf8ocZdVrxU6v3q2XND97QhR4H5MBTsECwz6gLYlwriWPnJadDkm8jSe1RH70pyzC" ,message:req.body.message,numbers:[req.body.number]
    })
    const userDetails = req.body;
    var sql = 'INSERT INTO otp SET ?';
    db.query(sql, userDetails, function (err, data) {
        if (err) 
        {
            throw err;
        }
        else{
           
            console.log(req.body);
           
            res.send(response);
        }              
    });
})
module.exports = router;

