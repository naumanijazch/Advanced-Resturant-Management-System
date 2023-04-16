const express = require('express')
const router = express.Router()



const mysql = require('mysql');
const path = require('path');

// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: '033560honda)',
// //     database: 'arms'
// // });

// const connection = mysql.createConnection({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'be585d80437fc4',
//     password: 'c55973b5',
//     database: 'heroku_da174866af7a349'
// });
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'arms'
});


router.post('/auth', function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM employee WHERE e_username = ? AND e_password = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin_admin = true;
                request.session.admin_username = username;
                // Redirect to home page
                response.redirect('/admin/home');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});


router.get('/home', function (request, response) {
    if (request.session.loggedin_admin) {
        // Output username
        // console.log("menu_page trying");
        response.sendFile(path.join(__dirname + '/admin_home.html'));
        // response.send('Welcome back, ' + request.session.username + '!');
    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }

});



module.exports = router
