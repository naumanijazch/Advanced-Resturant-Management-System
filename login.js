
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const MemoryStore = require('memorystore')(session)
const port = process.env.PORT || 3000;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'arms'
});

// const connection = mysql.createConnection({
//     host: 'us-cdbr-east-06.cleardb.net',
//     user: 'be585d80437fc4',
//     password: 'c55973b5',
//     database: 'heroku_da174866af7a349'
// });

// const app = express();

// app.use(session({

//     cookie: { maxAge: 86400000 },
//     store: new MemoryStore({
//       checkPeriod: 86400000 
//     }),
//     secret: 'secret',
// //     secret: 'keyboard cat',
// //     resave: false,
//     resave: true,
//     // true ^
//     saveUninitialized: true
// }));

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs')


// http://localhost:3000/
// homepage
app.get('/', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/login.html'));
});


const { createHash } = require('crypto');
function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}

// homepage auth
app.post('/auth', function (request, response) {
    username = request.body.username;
    let password = request.body.password;
    
    if (username && password) {
        const hashed_password = hash(password);
        connection.query('SELECT * FROM customer WHERE c_username = ? AND c_password = ?', [username, hashed_password], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {

                request.session.loggedin = true;
                let LOGIN_SESSION = request.session.loggedin; 
                request.session.username = username;
                var C_USERNAME_SESSION = username;


                var cus_id = JSON.parse(JSON.stringify(results));
                var C_ID_SESSION = cus_id[0].c_id;
                module.exports = {
                    C_USERNAME_SESSION, C_ID_SESSION, LOGIN_SESSION
                }
                response.redirect('/user');
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


// signup page
app.get('/signup_page', function (request, response) {
    response.sendFile(path.join(__dirname + '/signup_page.html'));
});


// signup auth page

app.post('/signup_page/auth', function (request, response) {
    let name = request.body.name_field;
    let username = request.body.user_name_field;
    let email = request.body.email_id_field;
    let password = request.body.pswd_field;
    let c_password = request.body.confirm_pswd_field;
    let phone = request.body.phone_field;
    let address = request.body.address_field;

    if (password != c_password) {
        response.send('Password and Confirm Password Do Not Match');
        response.end();
    }
    
    if (name && username && email && password && c_password && phone && address) {
        const hashed_password = hash(password);
        connection.query('INSERT INTO customer (c_name, c_email, c_username, c_password, c_address, c_phone) VALUES(?, ?, ?, ?, ?, ?); ', 
                            [name, email, username, hashed_password, address, phone], function (error, results, fields) {
            if (error) throw error;
            response.redirect('/');
        
            response.end();
        });
    } else {
        response.send('Please enter Fields!');
        response.end();
    }
});

debugger;

// admin login page
app.get('/admin', function (request, response) {
    response.sendFile(path.join(__dirname + '/admin_login.html'));
});


// admin login auth page
app.post('/admin/auth', function (request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {  // encryption not needed for admin login
        connection.query('SELECT e_appointment FROM employee WHERE e_username = ? AND e_password = ?', [username, password], function (error, results, fields) 
        {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;

                var appt = JSON.parse(JSON.stringify(results))
                
                if (appt[0].e_appointment == "Manager" )
                {
                    // response.send("Manager!")
                    response.redirect('/admin/manager')
                    response.end();
                }
                else if (appt[0].e_appointment == "Cashier")
                {
                    // response.send("Cashier!")
                    response.redirect('/admin/cashier')
                    response.end();
                }
                else if (appt[0].e_appointment == "Delivery Rider")
                {
                    // response.send("Delivery Rider!")
                    response.redirect('/admin/delievery')
                    response.end();
                }
                else if (appt[0].e_appointment == "Chef")
                {
                    // response.send("Chef!");
                    response.redirect('/admin/chef')
                    response.end();
                }
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


                                        // Create tables
let first =
`
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

    <link rel="stylesheet" href="/chef-orders.css">
    <title>Document</title>
  </head>
  <style>
    table {
      width: 100%;
    }
    tr {
      text-align: left;
      border: 1px solid black;
    }
    th, td {
      padding: 15px;
    }

  </style>

  <body>
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
        <a class="navbar-brand" href="#"></a>
        </div>
        <ul class="nav navbar-nav">`


       
let post_mid = `
        </ul>
        <ul class="nav navbar-nav navbar-right">
        <li><a href="/admin"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
        </ul>
    </div>
</nav>
<table>`

let second = `
</body>
</html>`;


function create_table(arra,page){
    let mid = ``;

    if (page == `delivery`){
        mid = `<h2> Delivery Driver </a></h2>
        <li><a href="/completed_order">Update Order to Completed</a></li>`
    }
    else if (page == `employee_database`){
        mid = `<li><a href="/admin/manager">Home</a></li>
        <li><a href="/employee_database">Employee Database</a></li>
        <li><a href="/update_employee_database">Update Employee Database</a></li>
        <li><a href="/inventory_database">Inventory Database</a></li>
        <li><a href="/update_inventory_database">Update Inventory Database</a></li>
        <li><a href="/sales_trend">Sales Trend</a></li>`
    }
    else if (page == `cashier`){
        mid = `<h2> Cashier </a></h2>
        <li><a href="/confirm_payment">Confirm Order Payment</a></li>`
    }
    else if (page == `order_status`){
        mid = `<li><a href="/admin/chef">Home</a></li>
        <li><a href="/order_status">Order Status</a></li>
        <li><a href="/ready_order">Update Order to Ready</a></li>
        <li><a href="/inventory_database">Inventory Database</a></li>`
    }
    else if (page == `inventory_database`){
        mid = `<h2> Inventory </a></h2>`
    }

    key = Object.keys(arra[0]);
    
    let u = create_headers(key);
    let b = create_rows(arra,key);

    b = first +mid+ post_mid+ u + b+ second;

    return b;
};

function create_headers(key){
    let a = `<table><tr>`;

    for(let i = 0;i<key.length;i++){
        a = a + `<th>${key[i]}</th>`
    }
    a = a + `</tr>`;

    return a;
}

function create_rows(arra,key){
    let a = ``;
    let counter = 0;

    while(counter < arra.length){
        a = a + `<tr>`;
        for (let j = 0;j < key.length;j++){
            a = a + `<td>${arra[counter][key[j]]}</td>`;
        }
        a = a+`</tr>`;
        counter = counter+1;
    }
    a = a + `</table>`;
    
    return a;
}


                            // AFTER ADMIN LOGIN PAGE

// admin manager page  
app.get('/admin/manager', function (request, response) {
    response.sendFile(path.join(__dirname + '/admin_home.html'));
});

// admin cashier page  
app.get('/admin/cashier', function (request, response) {
    // response.sendFile(path.join(__dirname + '/cashier-orders.html'));
    connection.query('SELECT o_id as "Order ID", c_name as "Customer Name", o_status as "Order Status" FROM orders join customer where customer.c_id = orders.c_id', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            var appt = JSON.parse(JSON.stringify(results))
            let page = `cashier`
            let table= create_table(appt, page);
            response.send(table);
            }            
        })
});

// admin chef page  
app.get('/admin/chef', function (request, response) {
    // response.sendFile(path.join(__dirname + '/chef-orders.html'));
    response.sendFile(path.join(__dirname + '/chef_page.html'));
});

// admin delievery page  
app.get('/admin/delievery', function (request, response) {
    // response.sendFile(path.join(__dirname + '/delivery-orders.html'));
    connection.query('SELECT o_id as "Order ID", c_name as "Customer Name", o_status as "Order Status" FROM orders join customer where customer.c_id = orders.c_id', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            var appt = JSON.parse(JSON.stringify(results))
            let page = `delivery`;
            let table= create_table(appt,page);
            response.send(table);
            }            
        })
});


// /employee_database
app.get('/employee_database', function (request, response) {
    // response.send("EMPLOYEEE DATABASE")
    connection.query('SELECT e_id as "ID", e_name as "Name", e_phone as "Phone Number", e_username as "Username", e_password as "Password", e_appointment as "Appointment" FROM employee', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            var appt = JSON.parse(JSON.stringify(results))
            let page = `employee_database`;
            let table= create_table(appt,page);
            response.send(table);
            }            
        })
});

// /update_employee_database
app.get('/update_employee_database', function (request, response) {
    response.sendFile(path.join(__dirname + '/insert_employee.html')); 
});    

// /update_employee_database auth page
app.post('/update_employee_database/auth', function (request, response) {
    let username = request.body.user_name_field;
    let email = request.body.email_id_field;
    let password = request.body.pswd_field;
    let phone_field = request.body.phone_field;
    let appointment  = request.body.appointment_field;
    
    if (username && email && password && phone_field && appointment) {
        connection.query('INSERT INTO employee ( e_name, e_phone, e_username, e_password, e_appointment) VALUES(?, ?, ?, ?, ?); ', 
                            [username,phone_field, username ,password ,appointment], function (error, results, fields) {
                                if (error) throw error;
                                response.redirect('/admin/manager');
                                
                                response.end();
                            });
                        } else {
                            response.send('Please enter Fields!');
                            response.end();
    }
});


// /update_employee_database
app.get('/update_inventory_database', function (request, response) {
    response.sendFile(path.join(__dirname + '/insert_inventory.html')); 
});  

// /update_inventory_database/auth
app.post('/update_inventory_database/auth', function (request, response) {
    let ID = request.body.in_id_field;
    let quantity = request.body.item_quantity_field;

    if (ID && quantity) {

        update_inventory = "UPDATE inventory SET in_quantity = in_quantity + ? WHERE in_id = ?;"
        connection.query(update_inventory, [quantity, ID], function (error, results, fields) {

            if (error) throw error;
//             response.redirect('/admin/manager');
        
            response.end();
        });
    } else {
        response.send('Please enter Fields!');
        response.end();
    }
});



// /inventory_database
app.get('/inventory_database', function (request, response) {
    // response.send("INVENTORY DATABASE")
    connection.query('SELECT in_id as "Item ID", in_item as "Item Name", in_quantity as "Item Quantity", s_id as "Supplier ID", e_id as "Employee ID" FROM inventory', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            var appt = JSON.parse(JSON.stringify(results))
            let page = `inventory_database`;
            let table= create_table(appt, page);
            response.send(table);
            }            
        })
});

// /sales_trend
app.get('/sales_trend', function (request, response) {

    connection.query('SELECT month(t_date) as date,sum(t_amount) as Total_Sales from transaction group by date; ', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            var appt = JSON.parse(JSON.stringify(results))
            let chart = an;
            let dat = rows_for_chart(appt);
            let mid = `<li><a href="/admin/manager">Home</a></li>
            <li><a href="/employee_database">Employee Database</a></li>
            <li><a href="/update_employee_database">Update Employee Database</a></li>
            <li><a href="/inventory_database">Inventory Database</a></li>
            <li><a href="/update_inventory_database">Update Inventory Database</a></li>
            <li><a href="/sales_trend">Sales Trend</a></li>`
            chart = first + mid + post_mid;  // header and background
            chart = chart + an + dat + ab;  // data for the chart
            response.send(chart);
            }            
        })
});

let an = `
<html>
<center>
  <head>
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
  <script type="text/javascript">
      google.charts.load('current', {'packages':['bar']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([`


let ab = `
        ]);

        var options = {
          chart: {title: 'Sales Trend', subtitle: 'Sales per month: 2012-2025'},
          backgroundColor: '#2d2a2a',
          colors: 'f76209',
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    </script>
  </head>
  <center>
  <body>
    <div id="columnchart_material" style="width: 1200px; height: 600px;">
    </div>
  </body>
</html>`


function rows_for_chart(arra){

    let a = `[`;

    key = Object.keys(arra[0])

    for(let i = 0;i<key.length;i++){
        if (i == key.length-1){
            a = a + `'${key[i]}']`
            continue;
        }
        a = a + `'${key[i]}',`
        
    }
    
    let counter = 0;
    while(counter < arra.length){
        a = a + `,[`;
        for (let j = 0;j < key.length;j++){
            if (j == key.length-1){
            a = a + `${arra[counter][key[j]]}]`;
            continue;
            }
            a = a + `${arra[counter][key[j]]},`;

    }
        counter = counter+1;

    }
    return a;
}

                        // Chef Page 
app.get('/order_status', function (request, response) {
    // response.send("ORDER STATUS")
    connection.query('SELECT o_id as "Order ID", c_name as "Customer Name", o_status as "Order Status" FROM orders join customer where customer.c_id = orders.c_id', function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            var appt = JSON.parse(JSON.stringify(results))
            let page = `order_status`
            let table= create_table(appt, page);
            response.send(table);
            }            
        })
});


                        // UPDATE ORDER STATUS

// /completed_order
app.get('/completed_order', function (request, response) {
    // response.send("Completed Order Status")
    response.sendFile(path.join(__dirname + '/completed_order.html'));
});


// /completed_order/auth
app.post('/completed_order/auth', function (request, response) {
    // console.log("comes into ready")
    let order_ID = request.body.id_field;

    if (order_ID) {
        connection.query('Update orders set o_status = "Completed" where o_id = ?', [order_ID], function (error, results, fields) {
            if (error) throw error;
            response.redirect('/admin/delievery');
            response.end();
        });
    } else {
        response.send('Please enter Fields!');
        response.end();
    }
});


app.get('/ready_order', function (request, response) {
    // response.send("Ready Order Status")
    response.sendFile(path.join(__dirname + '/ready_order.html'));
});

// /ready_order/auth
app.post('/ready_order/auth', function (request, response) {
    let order_ID = request.body.order_id;

    if (order_ID) {
        connection.query('Update orders set o_status = "Ready" where o_id = ?', [order_ID], function (error, results, fields) {
            if (error) throw error;
            response.redirect('/admin/chef');
        
            response.end();
        });
    } else {
        response.send('Please enter Fields!');
        response.end();
    }
});

// //confirm_payment
app.get('/confirm_payment', function (request, response) {
    // response.send("Ready Order Status")
    response.sendFile(path.join(__dirname + '/confirm_transaction.html'));
});

// /confirm_payment/auth
app.post('/confirm_payment/auth', function (request, response) {
    let transaction_id = request.body.t_id;
    let transaction_amount = request.body.t_amount;
    let transaction_date = request.body.t_date;
    let transaction_type = request.body.t_type;
    let e_id = request.body.e_id;
    let c_id = request.body.c_id;
    let order_id = request.body.order_id;
    
    if (transaction_id && transaction_amount && transaction_date && transaction_type && e_id && c_id && order_id) {
        connection.query('INSERT INTO transaction ( t_amount, t_date, t_type, e_id, o_id, c_id) VALUES( ?, ?, ?, ?, ?, ?); ', 
                            [transaction_amount, STR_TO_DATE(transaction_date, "%d-%m-%Y"), transaction_type, e_id, order_id, c_id ], function (error, results, fields) {
        if (error) throw error;
            response.redirect('/admin/cashier');
        
            response.end();
        });
    } else {
        response.send('Please enter Fields!');
        response.end();
    }
});


// /email
app.get('/www.ethereal.email', function (request, response) {
    response.writeHead(301, {
        Location: `https://ethereal.email/`
      }).end();    // response.sendFile(path.join(__dirname + '/confirm_transaction.html'));
});


const adminrouter = require('./routes/admin/admin')
app.use('/admin',adminrouter)

const userrouter = require('./routes/user/user') 
app.use('/user', userrouter)


app.listen(port);
// app.listen(3000);
