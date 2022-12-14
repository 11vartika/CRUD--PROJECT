var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'User List', });   
	res.cookie(`Cookie token name`,`encrypted cookie string Value`);
});




router.post('/logins', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM register WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect username and/or password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter username and password!');
		response.end();
	}
});

module.exports = router;


