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
const ipRegex = require('ip-regex');
var sub = redis.createClient(),
    pub = redis.createClient();
var util = require('util')
const axios = require('axios');

var express = require('express')
var app = express()

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
var mysql = require('mysql');
var sql = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: config.db_password,
    database: 'host'
});
var domain = require('domain-regex');
const Gamedig = require('gamedig');

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
    client.user.setActivity("NORD");
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of nord (vpn)`);


});


app.get('/paypalhook', function (req, res) {
    res.send('hello world')
    var orders = client.channels.get('518411452470525963');
    var children = orders.children.array();
    
    children.forEach(function(channel, i){
    
          /*      if (channel.topic == undefined) {
             //   channel.send("Status: **Awaiting order**")
            } else {
              */  
             
             if (channel.topic != undefined) {
                paypal.invoice.get(channel.topic, function(error, invoice) {
                    if(invoice.status == "PAID"){
                        if(!channel.topic == "Paid"){
                        channel.send("Status: **" + invoice.status + "**")

                        message.channel.setTopic("Paid");
                        }
                    }
                    
                
                });
      }
    

             
    });   
  });


  app.listen(1337);

/*
Runs every day at 8:00AM
//0 0 8 * * *
*/
// Check status of tickets

// Check order status

/*
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



checkinvoices.start()
*/
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

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};


client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const {
        d: data
    } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    client.emit(events[event.t], reaction, user);
});


// Quick reply messages 2-9 27 28
const responseObject = {
    "-links": "soon",
    "-discord": "soon",
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

function shorten(text) {

    return text.substring(0, 4);
}

function createchannel(message, c) {
    let role = message.guild.roles.find("name", "*");
    let role2 = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });
    c.overwritePermissions(role2, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
    });
    c.overwritePermissions(message.author, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });

}

const status = {
    "Wqrld": {
        "message": "",
        "budget": ""

    },
};
client.on('messageReactionAdd', (reaction, user) => {

if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "commissions")) return;
if(!user.bot && reaction.emoji.name === "✅"){
//console.log("reaction!" + reaction.message.reactions.array().length);
if(reaction.message.reactions.array().length != 1){return}


//console.log(reaction.message.embeds[0].fields);


var id = reaction.message.embeds[0].fields[4].value;
var channel = client.guilds.get('517394741911093268').channels.find(c => c.name == id);
console.log(id + "\n" + channel)
channel.send("<@" + user.id + "> Has claimed your comission\nPlease discuss a price and when ready type -invoice (amount)");
channel.overwritePermissions(user, {
    SEND_MESSAGES: true,
    READ_MESSAGES: true
});


}


});



client.on('messageReactionAdd', (reaction, user) => {
    status[user.id] = {};


    message = reaction.message;
    message.author = user;

    // if (user.bot) return;
    if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "ticket-creation")) return;
    if (reaction.emoji.name === "🎟") {
        console.log("hhh");
      if(user.bot) {return}
       reaction.remove(user);


        if (!message.guild.channels.exists("name", "ticket-" + shorten(message.author.id))) {
            message.guild.createChannel(`ticket-${shorten(message.author.id)}`, "text").then(c => {
                c.setParent('518411134953586690');
                createchannel(message, c);

                const embed = new Discord.RichEmbed()
                    .setColor('#36393f')
                    .addField(`Hey ${message.author.username}!`,
                        `Please try explain your request in as much detail as possible. Our **Freelancers** will be here soon to help.`)
                    .setTimestamp();



                    
                c.send({
                        embed: embed
                    }).then(function(message) {
ticketchannel = message;

                        //

                        // Create a message collector
                        const filter = m => m.author == user;
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 15000
                        });
                        collector.on('collect', m => {


                            collector.stop();

status[user.id]["message"] = m.content; 


                            m.reply("Do you have a budget? Press on the ‘n’ emoji for no, specify it if yes.").then(function(m) {


                                m.react("🇳");
                                
                                const n = (reaction, user) => reaction.emoji.name === "🇳" && !user.bot;
                                const noc = m.createReactionCollector(n, {
                                    time: 30000
                                });

                                noc.on('collect', reaction => {
                                    noc.stop();
                                    //got budget
                                    status[user.id]["budget"] = "quote"; 

                                    m.reply("What’s your deadline?, if none say \"no\"").then(function(m) {
                                        //got deadline
                                        const filter = m => m.author == user;
                                        const collector = message.channel.createMessageCollector(filter, {
                                            time: 15000
                                        });
                                        collector.on('collect', m => {
                                            status[user.id]["deadline"] = m.content;
                                            var channel = client.channels.get('518433045330526243');
                                           m.channel.send("Your request has been sent to our freelancers");
                                           const embed = new Discord.RichEmbed()
                                           .setColor(0xdd2e44)
                                           .setTitle("Comission")
                                           .setFooter("Bot by Wqrld#7373")
                                         //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                                           //.setImage('https://ferox.host/assets/images/logo.png')
                                           .addField(`Client`, message.author, true)
                                           .addField(`request`, status[user.id]["message"], true)
                                           .addField(`Budget`, status[user.id]["budget"], true)
                                           .addField(`Deadline`, status[user.id]["deadline"], true)
                                           .addField(`ID`, m.channel.name, true)
                                           .addBlankField()
                                           .addField(`Status`, "Awaiting claim")
                                           .setTimestamp();
                                       channel.send({
                                           embed: embed
                                       }).then(function(m){
                                           m.react("✅");
                                       });

                                        });

                                    });

                                });

                                const filter = m => m.author == user;
                                const collector = message.channel.createMessageCollector(filter, {
                                    time: 15000
                                });
                                collector.on('collect', m => {
                                    collector.stop();
                                    //got budget
                                    status[user.id]["budget"] = m.content; 
                                    
                                    m.reply("What’s your deadline?, if none say \"no\"").then(function(m) {
                                        //got deadline
                                        const filter = m => m.author == user;
                                        const collector = message.channel.createMessageCollector(filter, {
                                            time: 15000
                                        });
                                        collector.on('collect', m => {
                                            status[user.id]["deadline"] = m.content;
                                            var channel = client.channels.get('518433045330526243');
                                            message.reply("Your request has been sent to our freelancers");
                                            
                                            const embed = new Discord.RichEmbed()
                                            .setColor(0xdd2e44)
                                            .setTitle("Comission")
                                         //   .setFooter("Lookup")
                                          //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                                            //.setImage('https://ferox.host/assets/images/logo.png')
                                            .addField(`Client`, message.author, true)
                                            .addField(`request`, status[user.id]["message"], true)
                                            .addField(`Budget`, status[user.id]["budget"], true)
                                            .addField(`Deadline`, status[user.id]["deadline"], true)
                                            .addField(`ID`, m.channel.name, true)
                                            .addBlankField()
                                            .addField(`Status`, "Awaiting claim")
                                            .setTimestamp();
                                            channel.send({
                                                embed: embed
                                            }).then(function(m){
                                                m.react("✅");
                                            });




                                        });



          
                                        

                                    });

                                });

                            });

                        });

                    })


                    //Do you have a budget? Press on the ‘y’ emoji for yes, and the ‘n’ emoji for no. 

                    //What’s your deadline?
                    //Your request has been posted, you’ll be mentioned once a freelancer has accepted your commission.

                    .catch(console.error); // Send errors to console
            });

        }
    }
});



//no
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Oops, no commands!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        if (props.command.info != undefined) {
            commands.set(props.command.name, props.command.info);
        } else {
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
    let args = message.content.trim().split(' ');
    //   let cmd = client.commands.get(message.content.slice(1));
    console.log(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    let cmd = client.commands.get(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    if (cmd) cmd.run(Discord, client, message, commands, args);

});


// Bot token 
client.login(config.bot_token);