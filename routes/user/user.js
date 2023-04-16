
var nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()

const mysql = require('mysql');
const path = require('path');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '033560honda)',
//     database: 'arms'
// });

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


var sending_string = ""
var complete_string = ""
router.use(express.static(path.join(__dirname, 'static')));

// if (typeof window !== 'undefined') {
//     console.log('You are on the browser')
// } else {
//     console.log('You are on the server')
// }

var dict = {};
dict["biryani"] = 0;
dict["karahi"] = 0;
dict["haleem"] = 0;
dict["naan"] = 0;
dict["raita"] = 0;
dict["water"] = 0;







//http://localhost:3000/user

// router.use('/', function (req, res, next) {
//     next()
// })




router.get('/', function (request, response) {
    // If the user is loggedin
    
    const loginModule = require('../../login.js');
    if (loginModule.LOGIN_SESSION) {
        dict["biryani"] = 0;
        dict["karahi"] = 0;
        dict["haleem"] = 0;
        dict["naan"] = 0;
        dict["raita"] = 0;
        dict["water"] = 0;

        // Output username
        // console.log("menu_page trying");
        response.render("menu_page", { biryani: dict["biryani"], karahi: dict["karahi"], haleem: dict["haleem"], raita: dict["raita"], water: dict["water"], naan: dict["naan"], customerUserName: loginModule.C_USERNAME_SESSION })
        
        // response.send('Welcome back, ' + request.session.username + '!');
    } else {
        // Not logged in
        dict["biryani"] = 0;
        dict["karahi"] = 0;
        dict["haleem"] = 0;
        dict["naan"] = 0;
        dict["raita"] = 0;
        dict["water"] = 0;

        response.send('Please login to view this page!');
    }
    // response.end();
});

router.get('/c', function (request, response) {
    // If the user is loggedin
    const loginModule = require('../../login.js');
    if (loginModule.LOGIN_SESSION) {

        // Output username
        // console.log("menu_page trying");
        response.render("menu_page", { biryani: dict["biryani"], karahi: dict["karahi"], haleem: dict["haleem"], raita: dict["raita"], water: dict["water"], naan: dict["naan"], customerUserName: loginModule.C_USERNAME_SESSION })

        // response.send('Welcome back, ' + request.session.username + '!');
    } else {
        // Not logged in
        dict["biryani"] = 0;
        dict["karahi"] = 0;
        dict["haleem"] = 0;
        dict["naan"] = 0;
        dict["raita"] = 0;
        dict["water"] = 0;

        response.send('Please login to view this page!');
    }
    // response.end();
});








router.post('/addtocartb', function (request,response){

    if (request.session.loggedin) { // do this with every add and subtract on cart
        dict["biryani"] = dict["biryani"] + 1;
        
        response.redirect('/user/c')
    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }
    


});

router.post('/addtocartck', function (request, response) {

    if (request.session.loggedin) {
    dict["karahi"] = dict["karahi"] + 1;
   
    response.redirect('/user/c')
    }
    else{
    response.send('Please login to view this page!');
    }

});

router.post('/addtocarth', function (request, response) {

    if (request.session.loggedin) {
    dict["haleem"] = dict["haleem"] + 1;
   
    response.redirect('/user/c')
    }
    else {
        response.send('Please login to view this page!');
    }

});
router.post('/addtocartn', function (request, response) {

    if (request.session.loggedin) {
    dict["naan"] = dict["naan"] + 1;
    
    response.redirect('/user/c')
    }
    else {
        response.send('Please login to view this page!');
    }


});
router.post('/addtocartr', function (request, response) {

    if (request.session.loggedin) {
    dict["raita"] = dict["raita"] + 1;
 
    response.redirect('/user/c')
    }
    else {
        response.send('Please login to view this page!');
    }


});

router.post('/addtocartw', function (request, response) {

    if (request.session.loggedin) {
    dict["water"] = dict["water"] + 1;
   
    response.redirect('/user/c')
    }
    else {
        response.send('Please login to view this page!');
    }

    


});



router.post('/minuscartb', function (request, response) {

    if (request.session.loggedin) {
    if(dict["biryani"] >0)
    {
    dict["biryani"] = dict["biryani"] -1;
    
    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }

});

router.post('/minuscartck', function (request, response) {
    if (request.session.loggedin) {
    if(dict["karahi"] > 0)
    {
    dict["karahi"] = dict["karahi"] - 1;

    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }


});

router.post('/minuscarth', function (request, response) {

    if (request.session.loggedin) {
    if(dict["haleem"] > 0)
    {
    dict["haleem"] = dict["haleem"] - 1;
   
    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }

});
router.post('/minuscartn', function (request, response) {

    if (request.session.loggedin) {
    if(dict["naan"] > 0)
    {
    dict["naan"] = dict["naan"] - 1;
    
    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }

});
router.post('/minuscartr', function (request, response) {

    if (request.session.loggedin) {
    if(dict["raita"] > 0)
    {
    dict["raita"] = dict["raita"] - 1;
   
    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }

});

router.post('/minuscartw', function (request, response) {

    if (request.session.loggedin) {
    if(dict["water"] >0)
    {
    dict["water"] = dict["water"] - 1;
   
    response.redirect('/user/c')
    }
    }
    else {
        response.send('Please login to view this page!');
    }
});





router.post('/place_order', function (request, response) {

    if (request.session.loggedin) {
        if (!((dict["biryani"] == 0) && (dict["karahi"] == 0) && (dict["haleem"] == 0) && (dict["naan"] == 0) && (dict["raita"] == 0) && (dict["water"] == 0))) {

            var b = dict["biryani"].toString();
            var k = dict["karahi"].toString();
            var h = dict["haleem"].toString();
            var n = dict["naan"].toString();
            var r = dict["raita"].toString();
            var w = dict["water"].toString();
            

            chicken_count = 0;
            rice = 0;
            spice = 0;
            yoghurt = 0;
            ghee = 0;
            mint = 0;
            tomatoes = 0;
            flour = 0;
            sugar = 0;
            yeast = 0;
            water = 0;

            if(dict["biryani"] > 0)
            {
                complete_string = complete_string + "Biryani [x" + b + "]  -  ";
                for(let i=0; i<dict["biryani"];i++)
                {
                    sending_string = sending_string +"Biryani,";
                    chicken_count+=1;
                    rice += 1;
                    spice += 1
                    ghee += 1
                }

                
            }
            if (dict["karahi"] > 0) {
                complete_string = complete_string + "Karahi  [x" + k + "]  -  ";
                for (let i = 0; i < dict["karahi"]; i++) {
                    sending_string = sending_string + "Karahi,";
                    chicken_count+=1;
                    tomatoes+=1
                    spice += 1
                    ghee += 1
                }

            }
            if (dict["haleem"] > 0) {
                complete_string = complete_string + "Haleem  [x" + h + "]  -  ";
                for (let i = 0; i < dict["haleem"]; i++) {
                    sending_string = sending_string + "Haleem,";
                    chicken_count+=1;
                    yoghurt += 1;
                    spice += 1
                    mint += 1
                    ghee += 1
                }

            }
            if (dict["naan"] > 0) {
                complete_string = complete_string + "Naan    [x" + n + "]  -  ";
                for (let i = 0; i < dict["naan"]; i++) {
                    sending_string = sending_string + "Naan,";
                    yeast +=1;
                    sugar += 1;
                    flour += 1
                    ghee += 1
                }

            }
            if (dict["raita"] > 0) {
                complete_string = complete_string + "Raita   [x" + r + "]  -  ";
                for (let i = 0; i < dict["raita"]; i++) {
                    sending_string = sending_string + "Raita,";
                    mint+=1;
                    yoghurt += 1;
                    spice += 1
                }

                
            }
            if (dict["water"] > 0) {
                complete_string = complete_string + "Water   [x" + w + "]  -  ";
                for (let i = 0; i < dict["water"]; i++) {
                    sending_string = sending_string + "Water,";
                    water += 1;
                }

            }

            sending_string = sending_string.slice(0,-1);
            complete_string = complete_string.slice(0,-5);



            chicken_count_query = `UPDATE inventory set in_quantity = in_quantity - ${chicken_count} WHERE in_item = 'Chicken'`
            rice_count_query = `UPDATE inventory set in_quantity = in_quantity - ${rice} WHERE in_item = 'Basmati Rice'`
            spice_count_query = `UPDATE inventory set in_quantity = in_quantity - ${spice} WHERE in_item = 'Spice Powders'`
            yoghurt_count_query = `UPDATE inventory set in_quantity = in_quantity - ${yoghurt} WHERE in_item = 'Yoghurt'`
            ghee_count_query = `UPDATE inventory set in_quantity = in_quantity - ${ghee} WHERE in_item = 'Ghee'`
            mint_count_query = `UPDATE inventory set in_quantity = in_quantity - ${mint} WHERE in_item = 'Mint'`
            tomatoes_count_query = `UPDATE inventory set in_quantity = in_quantity - ${tomatoes} WHERE in_item = 'Tomatoes'`
            flour_count_query = `UPDATE inventory set in_quantity = in_quantity - ${flour} WHERE in_item = 'Flour'`
            sugar_count_query = `UPDATE inventory set in_quantity = in_quantity - ${sugar} WHERE in_item = 'Suger'`
            yeast_count_query = `UPDATE inventory set in_quantity = in_quantity - ${yeast} WHERE in_item = 'Yeast'`
            water_count_query = `UPDATE inventory set in_quantity = in_quantity - ${water} WHERE in_item = 'Water'`

            connection.query(chicken_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(rice_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(spice_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(yoghurt_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(ghee_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(mint_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(tomatoes_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(flour_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(sugar_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(yeast_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            connection.query(water_count_query, function (error, results, fields) {
                    if (error) throw error;
                    })
            
            response.render("place_order", {string: "You have ordered: " + complete_string})
            complete_string = ""



            chicken_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Chicken'`
            rice_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Basmati Rice'`
            spice_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Spice Powders'`
            yoghurt_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Yoghurt'`
            ghee_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Ghee'`
            mint_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Mint'`
            tomatoes_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Tomatoes'`
            flour_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Flour'`
            sugar_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Suger'`
            yeast_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Yeast'`
            water_inventory = `SELECT in_quantity FROM inventory WHERE in_item = 'Water'`

            chicken_count = 0
            rice = 0
            spice = 0
            yoghurt = 0
            ghee = 0
            mint = 0
            tomatoes = 0
            flour = 0
            sugar = 0
            yeast = 0
            water = 0

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'shanna85@ethereal.email',
                    pass: 'R5wgYWdJxeDnwuHgqW'
                }
            });


            
            connection.query(chicken_inventory, function (error, results, fields) {
                if (error) throw error;
                chicken_count = results[0].in_quantity;

                if(chicken_count < 5){
                    var mailOptions = {
                        from: 'restaurantmanagement@arms.com',
                        to: 'manager@arms.com',
                        subject: 'WARNING: Inventory Low',
                        text: 'CHICKEN is running low. Please order more.'
                        };
        
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } 
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                }
                })
            connection.query(rice_inventory, function (error, results, fields) {
                    if (error) throw error;
                    rice = results[0].in_quantity;

                    if(rice < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'RICE is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }                    
                                        
                    })
            connection.query(spice_inventory, function (error, results, fields) {
                    if (error) throw error;
                    spice = results[0].in_quantity;

                    if(spice < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'SPICE is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(yoghurt_inventory, function (error, results, fields) {
                    if (error) throw error;
                    yoghurt = results[0].in_quantity;

                    if(yoghurt < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'YOGHURT is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(ghee_inventory, function (error, results, fields) {
                    if (error) throw error;
                    ghee = results[0].in_quantity;

                    if(ghee < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'GHEE is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(mint_inventory, function (error, results, fields) {
                    if (error) throw error;
                    mint = results[0].in_quantity;

                    if(mint < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'MINT is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(tomatoes_inventory, function (error, results, fields) {
                    if (error) throw error;
                    tomatoes = results[0].in_quantity;

                    if(tomatoes < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'TOMATOES are running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(flour_inventory, function (error, results, fields) {
                    if (error) throw error;
                    flour = results[0].in_quantity;

                    if(flour < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'FLOUR is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(sugar_inventory, function (error, results, fields) {
                    if (error) throw error;
                    sugar = results[0].in_quantity;

                    if(sugar < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'SUGAR is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(yeast_inventory, function (error, results, fields) {
                    if (error) throw error;
                    yeast = results[0].in_quantity;

                    if(yeast < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'YEAST is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })
            connection.query(water_inventory, function (error, results, fields) {
                    if (error) throw error;
                    water = results[0].in_quantity;

                    if(water < 5){
                        var mailOptions = {
                            from: 'restaurantmanagement@arms.com',
                            to: 'manager@arms.com',
                            subject: 'WARNING: Inventory Low',
                            text: 'WATER is running low. Please order more.'
                            };
            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } 
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                    }     
                    })

            

        }
        else {
            response.send('Please add something to cart!');
        }
    }
    else {
        response.send('Please login to view this page!');
    }

});

router.post('/place_order/takeaway', function (request, response) {

    if (request.session.loggedin) {
        var today = new Date();
        const loginModule = require('../../login.js');


        connection.query('INSERT INTO orders (o_type, o_date, o_status, e_id, c_id, o_desc) VALUES( ?, ?, ?, ?, ?, ?); ',
            ["Takeaway", today, "In-Process", 9023,loginModule.C_ID_SESSION, sending_string], function (error, results, fields) {

            });
        response.redirect('/user/place_order/success');

    }
    else {
            response.send('Please login to view this page!');
        }
    
    sending_string = ""
    complete_string = ""

});

router.post('/place_order/delivery', function (request, response) {

   

    if (request.session.loggedin) {
        var today = new Date();
        const loginModule = require('../../login.js');

        connection.query('INSERT INTO orders (o_type, o_date, o_status, e_id, c_id, o_desc) VALUES( ?, ?, ?, ?, ?, ?); ',
            ["Delivery", today, "In-Process", 9023, loginModule.C_ID_SESSION, sending_string], function (error, results, fields) {

            });
        response.redirect('/user/place_order/success');  

    }
    else {
        response.send('Please login to view this page!');
    }
    sending_string = ""
    complete_string = ""


});


// router.get('/place_order/success', function (request, response) {
//     if (request.session.loggedin) {
//     response.sendFile(path.join(__dirname + '/thankyou_page.html'));
//     }
//     else {
//             response.send('Please login to view this page!');
//         }


// });



// html creater
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
        <li><a href="/"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
        </ul>
    </div>
</nav>
<table>`

let second = `
</body>
</html>`;


function create_table(arra,page){
    let mid = ``;

    if (page == `customer`){
        mid = `<h2> Customer </a></h2>`
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
//

router.get('/place_order/success', function(request, response) {
    
    const loginModule = require('../../login.js');
    connection.query('SELECT o_id as "Order ID", o_desc as "Order Details", o_type as "Order Type", o_status as "Order Status" FROM orders where c_id = ? and o_status != "Completed"', [loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {

            var appt = JSON.parse(JSON.stringify(results))
            let page = `customer`
            let table= create_table(appt, page);
            response.send(table);
            }            
        })
});


router.get('/personal_customer_info', function (request, response) {
    // response.send('Customer page');
    response.sendFile(path.join(__dirname + '../../../update_customer.html'));

});

router.post('/changed_name', function (request, response) {
    const loginModule = require('../../login.js');
    let new_name = request.body.change_name
    connection.query('UPDATE customer SET c_name = ? WHERE c_id = ?', [new_name, loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        response.redirect('/user');
        response.end()
        })
    ;
});

router.post('/changed_email', function (request, response) {
    const loginModule = require('../../login.js');
    let new_email = request.body.change_email
    connection.query('UPDATE customer SET c_email = ? WHERE c_id = ?', [new_email, loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        response.redirect('/user');
        response.end()
        })
    ;
});


const { createHash } = require('crypto');
function hash(str) {
    return createHash('sha256').update(str).digest('hex');
}

router.post('/changed_password', function (request, response) {
    const loginModule = require('../../login.js');
    let new_password = request.body.change_password
    const hashed_password = hash(new_password);
    connection.query('UPDATE customer SET c_password = ? WHERE c_id = ?', [hashed_password, loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        response.redirect('/user');
        response.end()
        })
    ;
});

router.post('/changed_address', function (request, response) {
    const loginModule = require('../../login.js');
    let new_address = request.body.change_address
    connection.query('UPDATE customer SET c_address = ? WHERE c_id = ?', [new_address, loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        response.redirect('/user');
        response.end()
        })
    ;
});

router.post('/changed_phone', function (request, response) {
    const loginModule = require('../../login.js');
    let new_phone = request.body.change_phone
    connection.query('UPDATE customer SET c_phone = ? WHERE c_id = ?', [new_phone, loginModule.C_ID_SESSION], function (error, results, fields) {
        if (error) throw error;
        response.redirect('/user');
        response.end()
        })
    ;
});



module.exports = router
