var express = require('express');
var router = express.Router();
var pdf        = require('html-pdf');
var fs         = require('fs');
var options    = {format:'A4'};
router.get('/', function (req, res, next) {
 
    res.render('modal', ); 
});

router.post('/template',(req,res)=>{
    res.render('demopdf',{data:req.body.article},function(err,html){
        pdf.create(html, options).toFile('./public/uploads/demopdf.pdf', function(err, result) {
            if (err){
                return console.log(err);
            }
             else{
            console.log(res);
            var datafile = fs.readFileSync('./public/uploads/demopdf.pdf');
            res.header('content-type','application/pdf');
            res.send(datafile);
             }
          });
    })
})

module.exports = router;