var express = require('express');
var router = express.Router();
var db = require('../database');
const qrcode = require("qrcode");
router.get('/', function (req, res, next) {
    res.render('scan', ); 
});
router.post("/scans", (req, res, next) => {
 
     var input_text = req.body.user_name;
      var input_text1 = req.body.gender;
      var input_text2 = req.body.mobile;
      var string = (input_text+input_text1+input_text2);
    qrcode.toDataURL(string, (err, src) => {
      if (err) res.send("Something went wrong!!");
      res.render("scan", {
        qr_code: src,
      });
    });
  });
module.exports = router;