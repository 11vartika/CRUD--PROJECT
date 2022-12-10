var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(request, response) {	
	if (request.session.loggedin) {		
	  response.render('home',{ title:request.session.username}); 
		//  response.redirect('/home',{ title:request.session.username});        
	} 	
	response.end();
});

module.exports = router;


