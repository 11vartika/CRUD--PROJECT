var express = require('express');
var router = express.Router();
var db = require('../database');



var bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
    res.render('password', {
        title: 'Reset Password ', token: req.query.token
    });
});
/* update password to database */
router.post('/update-password', function (req, res, next) {
    var token = req.body.token;
    var password = req.body.password;
    db.query('SELECT * FROM register WHERE token ="' + token + '"', function (err, result) {
        if (err) throw err;
        var type
        var msg
        if (result.length > 0) {
            var saltRounds = 10;
            // var hash = bcrypt.hash(password, saltRounds);
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    var data = {
                        password: password
                    }
                    db.query('UPDATE register SET ? WHERE email ="' + result[0].email + '"', data, function (err, result) {
                        if (err) throw err
                    });
                });
            });
            type = 'success';
            msg = 'Your password has been updated successfully';
        } else {
            console.log('password has been updated success', '2');
            type = 'success';
msg = 'Invalid link; please try again';

        }
        // req.flash('success', 'Your password has been updated successfully!!');
        req.flash(type, msg);
        res.redirect('/login');
    });
})
module.exports = router;