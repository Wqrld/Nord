// _  _  ____  ___  ____  ____    __      ___  ____   __    ___  ____ 
//( \/ )( ___)/ __)(_  _)(  _ \  /__\    / __)(  _ \ /__\  / __)( ___)
// \  /  )__)( (__   )(   )   / /(__)\   \__ \ )___//(__)\( (__  )__) 
//  \/  (____)\___) (__) (_)\_)(__)(__)  (___/(__) (__)(__)\___)(____)
// ____  ____  ____  _  _  __   ____  ____ 
//(  _ \(  _ \(_  _)( \/ )/__\ (_  _)( ___)
// )___/ )   / _)(_  \  //(__)\  )(   )__)  
//(__)  (_)\_)(____)  \/(__)(__)(__) (____) 


// Import the discord.js module
const Discord = require("discord.js");
var CronJob = require('cron').CronJob;
var moment = require('moment');
var redis = require("redis"),
    red = redis.createClient();

var sub = redis.createClient(), pub = redis.createClient();
var util = require('util')
const axios = require('axios');
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}
// Create an instance of a Discord client
const client = new Discord.Client();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var paypal = require('paypal-rest-sdk');
const fs = require("fs");
var item = require('./item.json');
var config = require('./config.json');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});
var commands = new Map();
var mysql      = require('mysql');
var sql = mysql.createPool({
    connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : config.db_password,
  database : 'host'
});


function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}




const codes = {
    "KekeYt": "10%",
};



const prefix = "-";


/*

function isCommand(message) {
    return message.content.toLowerCase().startsWith(prefix);
}

function isThisCommand(message, cmd) {
    //console.log("pre: " + prefix + "msg: " + message + "cmd: " + cmd);
    return message.content.toLowerCase().startsWith(prefix + cmd);
}

function isThisPM(message, cmd) {
    if(message.content.toLowerCase().startsWith(cmd) && !message.author.bot && message.channel.type == "dm"){
        return true
    }
    return false
}
*/
// Startup console message
client.on("ready", () => {
    client.user.setActivity("-new | Ferox");
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of Ferox Hosting`);




});

/*
Runs every day at 8:00AM
//0 0 8 * * *
*/
const checkinvoices = new CronJob('0 0 8 * * *', function() {
    console.log("running cron");

/*
        db.all("SELECT * FROM orders;", [], (err, rows) => {
            rows.forEach((row) => {
                message.channel.send(`${row.username} has item ${row.item} with price ${row.price} due at ${row.due}`);
*/


    var command = `SELECT * FROM orders`;




    sql.query(command, (err, rows) => {
        console.log("r: " + rows);
        if (err) {
            console.log(err);
        }
        rows.forEach((row) => {
            console.log("row processed");
            var duedate = moment(row.due, "DD-MM-YYYY");
            var now = moment();
            var diff = duedate.diff(now, 'days')
            console.log(`now: ${now}, due: ${duedate}`)
            if (diff < 0) {
                //cancel the order
                var Wqrld = client.users.find('username', "Wqrld")
                Wqrld.sendMessage(`**${row.username} heeft zijn €${row.price} niet voor ${row.due} betaald\n id: ${row.id}**`);
                user = client.users.find('username', row.username)
 if(user){
user.sendMessage(`Dear ${row.username},  You didn't pay €${row.price} before ${row.due} so your service has been automatically cancelled`);
                }else{
                   Wqrld.sendMessage(`${row.username} not found, cancel his service.`); 
                }

                console.log("cancel order");
                return
            }
            console.log(diff);
            if (diff < 5) {
                user = client.users.find('username', row.username)
                var Wqrld = client.users.find('username', "Wqrld")
                Wqrld.sendMessage(`${row.username} moet €${row.price} voor ${row.due} betalen`);
                if(user){
user.sendMessage(`Dear ${row.username}, You will need to pay your invoice of €${row.price} before ${row.due} to continue using this service.`);
                }else{
                   Wqrld.sendMessage(`${row.username} not found`); 
                }
                



            }




});
        });

// Check status of tickets

// Check order status
    var orders = client.channels.get('495344580237983747');
var children = orders.children.array();

children.forEach(function(channel, i){

            if (channel.topic == undefined) {
            channel.send("Status: **Awaiting order**")
        } else {
            paypal.invoice.get(channel.topic, function(error, invoice) {
                if(invoice.status == "SENT"){
channel.send("Status: **Awaiting payment**")
                }else{
                    channel.send("Status: **" + invoice.status + "**")
                }
                

            });
        }
})




    }, null, true, 'Europe/Berlin');

checkinvoices.start()

// Listener - Bot joins new servers
// Event listener for new members
client.on('guildMemberAdd', member => {
    welcomemsgs = [
        `Welcome to the server, ${member}`,
        `Welcome to the club, ${member}`,
        `Enjoy your stay, ${member}`,
        `Thanks for joining our server, ${member}`
    ]

    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find('name', 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(welcomemsgs.random());
});


// Quick reply messages 2-9 27 28
const responseObject = {
    "-links": "https://ferox.host \nhttps://panel.ferox.host\n https://discord.gg/vhxsFfH",
    "-panel": "https://panel.ferox.host",
    "-discord": "https://discord.gg/vhxsFfH",
    "Quick Response 4": ""
};

// Just saying what to do with the objects above
client.on("message", (message) => {
    if (responseObject[message.content]) {
        message.delete()
        //   message.channel.send(responseObject[message.content]);
        console.log(responseObject[message.content]);
        const embed = new Discord.RichEmbed()
            .setColor(0xCF40FA)
            .setFooter("Bot by Wqrld")
            .addField(message.content, responseObject[message.content])
        message.channel.send({
            embed: embed
        });



    }
});

client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("Oops, no commands!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f, i) => {    
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        if(props.command.info != undefined){
commands.set(props.command.name, props.command.info);
        }else{
        commands.set(props.command.name, "-" + props.command.name);
    }
        client.commands.set(props.command.name, props);

    });
});


client.on("message", (message) => {
    console.log("command requested")

    if (!message.content.startsWith("-") || message.channel.type == "dm" || message.author.bot) {
        return
    };

 //   let cmd = client.commands.get(message.content.slice(1));
 console.log(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    let cmd = client.commands.get(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    if(cmd) cmd.run(Discord, client, message, commands);

});


// Bot token 
client.login(config.bot_token);