var express = require('express');
var router = express.Router();
var db = require('../database');
const nodemailer=require('nodemailer');
router.get('/', function (req, res, next) {
    res.render('verification', ); 
});
var email;


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: 'vartika.bhatnagar@wittybrains.com',
      pass: 'Bhatnagar11@',
    }
    
});
router.post('/send',function(req,res){
    var datas = req.body;
    email=req.body.email;
    firstname=req.body.firstname;
     // send mail with defined transport object
    var mailOptions={
        to: req.body.email,
       subject: "Otp for registration is: ",
       html:"<h3 style='font-weight:bold;'> Welcome " + datas.firstname+  "</h3>"+
        "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>",
         // html body
         attachments:[
            {filename:'picture.jpg',path:'./picture.jpg', style:'width:80px;'}
         ]
     };
     
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('resend');
    });
});



router.post('/verify',function(req,res){

    if(req.body.otp==otp){
        // res.send("You has been successfully registered");
        res.render('verification',{message:"You has been successfully registered"});
        return;
    }
    else{
        res.render('resend',{message : "otp is incorrect"});
    }
});  
router.post('/resending',function(req,res){
  
    var mailOptions={
        to: email,
       subject: "Otp for registration is: ",
       html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
     };
   
     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('resend',{message:"otp has been sent"});
    });

});

module.exports = router;
