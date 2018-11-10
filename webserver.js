var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

var util = require('util')
const sqlite3 = require('sqlite3').verbose();
const chalk = require('chalk');
let db = new sqlite3.Database('./db.db');
var config = require('./config.json');
var mysql      = require('mysql');
var sql = mysql.createPool({
    connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : config.db_password,
  database : 'host'
});

sql.query('SELECT 1 * 9 AS solution', function (err, rows, fields) {
  if (err) throw err;
 if(rows[0].solution == 9 ){
console.log(chalk.green("sql connected"))
 };
});

const DiscordLogger = require('discord-logger');
const options = {
  endpoint: config.discord_endpoint,
  botUsername: 'Paypal hooks',
  infoPrefix: ':information_source:', // optional, default value is :information_source:,
  successPrefix: ':white_check_mark:', // optional, default value is :white_check_mark:,
  errorPrefix: ':sos:' // optional, default value is :sos:
}

const logger = new DiscordLogger(options);
var cookieParser = require('cookie-parser')

var redis = require("redis"),
    red = redis.createClient();
var sub = redis.createClient(), pub = redis.createClient();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
var port = process.env.PORT || 8085;
var apirouter = express.Router();
var router = express.Router();
//var basicAuth = require('basic-auth-connect');
app.use(cookieParser())
var paypal = require('paypal-rest-sdk');
var item = require('./item.json');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});
//app.use(basicAuth('ferox', 'latijn'));
const fetch = require('node-fetch');
const btoa = require('btoa');
app.use((req, res, next) => {
    res.removeHeader('Transfer-Encoding');
    res.removeHeader('X-Powered-By');
    next();

});
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));
app.enable('trust proxy')
app.use(function(req, res, next) {
console.log(req.path);
    if (req.path == "/discord" || req.path == '/api/paypalhook/payment') {
        console.log('paypalhook or discord');
        next();
        return;
    }
    console.log("request")
    if (req.cookies.token) {

        //var body = { a: 1 };
        fetch('http://discordapp.com/api/users/@me', {
                method: 'POST',
                // body:    JSON.stringify(body),
                headers: {
                    'Authorization': 'Bearer ' + req.cookies.token
                },
            })
            .then(apires => {
                user = apires.json().then((json) => {

req.user = json;
                    console.log("U; " + json);
                    if (json.id == "159302240929054720") {//Wqrld
req.admin = true;

                    }
                    	
                    	console.log("logged in")
                        next()
       
               //     res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=494381836915441674&redirect_uri=https%3A%2F%2Fadmin.ferox.host%2Fdiscord&response_type=token&scope=identify`);


                });
            });




            




    }else if(req.cookies.discord == "I am totally no discord bot haha Xeedee 3120 9"){
       console.log("bot authenticated");
       req.admin = true;
       var user = {};
       user.id = "159302240929054720";
       req.user = user;
       next();

    }

    else{
    	console.log("no token");
        console.log(req.originalUrl)
        red.set('lastloc.' + req.ip, req.originalUrl, redis.print);
    	  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=494381836915441674&redirect_uri=https%3A%2F%2Fadmin.ferox.host%2Fdiscord&response_type=token&scope=identify`);

    }


})

apirouter.post('/generateinvoice/:who/:amount/:id*?', function(req, res) {
if(!req.admin){
    res.redirect("/");
    return;
}
if(!req.params.id){
    var id = (new Date).getTime()
}else{
    var id = req.params.id
}

item.items[0].name = id;
        item.items[0].unit_price.value = parseInt(req.params.amount);
        item.billing_info[0].email = req.params.who;

        paypal.invoice.create(item, function(error, invoice) {
                paypal.invoice.send(invoice.id, function(error, rv) {
res.json(invoice);
                });
            });
//req.params.who

});


router.get('/buy/:what', function(req, res)  {
    console.log("u koopt: " + req.params.what);
res.render('checkout.ejs', {
item: req.params.what

});

});


apirouter.post('/paypalhook/:what', (req, res) => {
var body = req.body;
console.log(chalk.red(req.params.what + "\n" + JSON.stringify(body), null, 4));
logger.info(`id: ${body.id}\n price: ${body.resource.paid_amount.paypal.value} ${body.resource.paid_amount.paypal.currency}\n email: ${body.resource.billing_info[0].email}, ${body.resource.billing_info[0].business_name}`);
res.json({success: true});
sql.query(`SELECT * FROM orders WHERE id = '${body.resource.items[0].name}'`, (err, rows) => {
    console.log(rows);
    console.log(body.resource.items[0].unit_price.currency + "\n" + Math.floor(body.resource.items[0].unit_price.value) + "\n")
    if(rows.length < 1){
        console.log("non-item purchase");
    }else{
        // real item purchased

        
        if(body.resource.items[0].unit_price.currency == "EUR" && Math.floor(body.resource.items[0].unit_price.value) == rows[0].price){
            logger.info(`\`id: ${body.id}\n price: ${body.resource.paid_amount.paypal.value} ${body.resource.paid_amount.paypal.currency}\n email: ${body.resource.billing_info[0].email}, ${body.resource.billing_info[0].business_name}\``);
//real item purchased with right price
            console.log("got real transaction")
        }
    }


});


});


apirouter.get('/get/:what', function(req, res) {
if(!req.admin){
    res.redirect("/");
    return;
}

sql.query(`SELECT * FROM ${req.params.what};`, function (err, rows, fields) {
   
        res.json(rows);
   });

});

router.get('/discord', function(req, res) {
red.get("lastloc." + req.ip, function(err, reply) {
    console.log(reply);    
    res.render('discord.ejs', {
        req: req,
        lastloc: reply
    })
});


});


router.get('/admin', function(req, res) {
if(!req.admin){
    res.redirect("/");
    return;
}
    sql.query(`SELECT * FROM orders;`, (err, rows) => {
        console.log(rows);

        res.render('admin.ejs', {
            title: 'Register order!',
            orders: rows
        })
    });
    // show orders with a way to delete them (vue?)
});

router.get('/', function(req, res) {
    var command = `SELECT * FROM orders WHERE userid = ${req.user.id};`;
    console.log(command);
sql.query(command, (err, rows) => {
        console.log(rows);

        res.render('index.ejs', {
            email: 'wereld03@gmail.com',
            orders: rows
        })
    });

});

router.get('/login', function(req, res) {
    //res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=494381836915441674&redirect_uri=https%3A%2F%2Fadmin.ferox.host%2Fdiscord&response_type=code&scope=identify`);
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=494381836915441674&redirect_uri=https%3A%2F%2Fadmin.ferox.host%2Fdiscord&response_type=token&scope=identify`);

});



apirouter.post('/delete', function(req, res) {
    if(!req.admin){
    res.redirect("/");
    return;
}
    console.log(chalk.blueBright(req.body));
    var command = `DELETE FROM orders WHERE id = "${req.body.id}";`
console.log(chalk.green(command));
    sql.query(command, (err, rows) => {
        if (err) {
            console.log(chalk.green("my error is: " + err))
                    res.json({
            error: err
        });
        }
        res.json({
            message: "done"
        });
        console.log(chalk.redBright("deleted"));
    });


});
apirouter.post('/update', function(req, res) {
    if(!req.admin){
    res.redirect("/");
    return;
}
    /*
what = item
to = to
id = order id
    */
var command = `UPDATE orders SET ${req.body.what} = '${req.body.to}' WHERE id = ${req.body.id}`
    console.log(chalk.green(command));
sql.query(command, (err, rows) => {
        res.json({
            message: "done"
        });
});
});
/*
Generates order
@params (id), username, item, price, due, userid

*/
apirouter.post('/create', function(req, res) {
    if(!req.admin){
    res.redirect("/");
    return;
}
    console.log("create api body> " + req.body);
    if (Object.keys(req.body).length != 5) {
        res.render('admin.ejs', {
            title: `you have ${Object.keys(req.body).length}/4 keys`,
            orders: []
        })
        return;
    }
    var command = `INSERT INTO orders VALUES (${(new Date).getTime()}, "${req.body.username}", "${req.body.item}", ${req.body.price}, "${req.body.due}", "${req.body.userid}")`
    console.log(chalk.green(command));

    sql.query(command, (err, rows) => {
    	if(err){console.log(err)}
        sql.query(`SELECT * FROM orders;`, (err, rows) => {
        	if(err){console.log(err)}
            res.redirect('/admin');
   

        });

    });

});




app.use('/', router);

app.use('/api', apirouter);


app.listen(port);
console.log('Magic happens on port ' + port);