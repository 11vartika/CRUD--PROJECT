var express = require('express');
var router = express.Router();
var db = require('../database');
var randtoken = require('rand-token');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var randtoken = require('rand-token');
function sendEmail(email, token) {
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
   
    user: 'vartika.bhatnagar@wittybrains.com',
    pass: 'Bhatnagar11@',
    }
    });
    var mailOptions = {
    from: 'vartika.bhatnagar@wittybrains.com',
    to: email,
    subject: 'Reset Password Link ',
    html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/password?token=' + token + '">link</a> to reset your password</p>'
    };
    mail.sendMail(mailOptions, function(error, info) {
    if (error) {
    console.log(1)
    } else {
    console.log(0)
    }
    });
    }

router.get('/', function (req, res, next) {
    res.render('resetpass',{title: 'Forgot Your Password'} ); 
});

router.post('/reset-password-email', function(req, res, next) {
    var email = req.body.email;
    //console.log(sendEmail(email, fullUrl));
 db.query('SELECT * FROM register WHERE email ="' + email + '"', function(err, result) {
    if (err) throw err;
    var type = ''
    var msg = ''
    console.log("pass",result[0]);
    if (result[0].email.length > 0) {
    var token = randtoken.generate(20);
    var sent = sendEmail(email, token);
    if (sent != '0') {
    var data = {
    token: token
    }
 db.query('UPDATE register SET ? WHERE email ="' + email + '"', data, function(err, result) {
    if(err) throw err
    })
    type = 'success';
    msg = 'The reset password link has been sent to your email address';
    } else {
        type = 'error';
        msg = 'Something goes to wrong. Please try again';
    }
    } else {
    console.log('UPDATE register','2');
    type = 'error';
msg = 'The Email is not registered with us';
    }
    // req.flash('success', 'The reset password link has been sent to your email address!!');
    req.flash(type, msg);
    res.redirect('/resetpass');
    });
    })
    
module.exports = router;