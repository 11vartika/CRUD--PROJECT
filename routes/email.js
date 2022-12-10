var express = require('express');
var router = express.Router();
var db = require('../database');
const nodemailer = require("nodemailer");
router.get('/', function (req, res, next) {

    res.render('email', );
});
router.post('/emailing', function (req, res, next) {


    const userDetails = req.body;


    var sql = 'INSERT INTO emailing SET ?';
    db.query(sql, userDetails, function (err, data) {
        if (err) {
            throw err;
        }
        else {
            console.log("User data is inserted successfully ");
            var sql1 = 'SELECT * FROM emailing';
            db.query(sql1, function (err, data, fields) {
                if (err) throw err;
            });
            var datas = req.body;


            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'vartika.bhatnagar@wittybrains.com',
                    pass: 'Bhatnagar11@'
                }
            });

            let info = transporter.sendMail({
                from: datas.email,
                to: datas.email2,

                subject: datas.subject,

                html: "<p  style='background-color: rgb(117, 175, 167);padding:20px;border-radius: 5px;font-size:20px'>Sent from  " + datas.email + "</p>" +
                    "<p  style='background-color: rgb(117, 175, 167);padding:20px;border-radius: 5px;font-size:20px'>Sent to " + datas.email2 + "</p>" +
                    '<h1>Request Summary : </h1>' +
                    '<tables style="border: 1px solid #333;" >' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">First Name</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.first_name +'</td>' +
                    ' </tr>' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">last name</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.last_name +'</td>' +
                    ' </tr>' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">Gender</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.gender +'</td>' +
                    ' </tr>' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">Email Requested Id</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.requested +'</td>' +
                    ' </tr>' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">Sponsor</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.sponsor +'</td>' +
                    ' </tr>' +

                    '<tr>' +
                    '<th scope="row" style="background-color: rgb(117, 175, 167); width:200px;font-size:20px;padding:5px">Status</th>' +
                    '<td style="background-color: 	rgb(0, 191, 255); width:200px;font-size:20px;padding:5px">'+ datas.status +'</td>' +
                    ' </tr>' +

                    '</table>'
            },
                function (error) {
                    if (error)
                        console.log(error)
                    else
                    console.log("userdata",data)
                        res.render("email",)
                })

            res.redirect('/email');
        }

    });

});


module.exports = router;