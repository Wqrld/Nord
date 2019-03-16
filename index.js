//Copyright Wqrld#7373, education purposes only. This software may not be sold or used for commerical goals.

// Import the discord.js module
const Discord = require("discord.js");
var redis = require("redis"),
    red = redis.createClient();

var express = require('express')
var app = express()
// Create an instance of a Discord client
const client = new Discord.Client();
var paypal = require('paypal-rest-sdk');
const fs = require("fs");
var config = require('./config.json');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});


var commands = new Map();
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}
var ct = 86400000

client.on("ready", () => {
    client.user.setActivity(config.name, { type: 'STREAMING', url: "https://www.twitch.tv/monstercat" });
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ` + config.name);
});
var utils = require("./lib/utils.js");

require("./modules/paypalhook.js")(app, client);
require("./modules/quickrespond.js")(client);
require("./modules/newsalesrep.js")(client);
//require("./modules/joinmessage.js")(client);
require("./modules/commandloader.js")(client, commands);
require("./modules/reactionclaim.js")(client);
require("./modules/welcomer.js")(client);
app.listen(1337);

var status = {
    "Wqrld": {
        "message": "",
        "budget": ""

    }
};


function requestdeadline(user, m) {
    console.log("requestdeadline")
    var embed = new Discord.RichEmbed()
    .setColor('#36393f')
    .addField(`Order Assistant`,
    "What’s your deadline?\n If you have no deadline say 'no deadline'.")
    .setTimestamp();




//m.channel.send("test")

    m.channel.send({
        embed: embed
    }).then(function(m) {
  //      m.channel.send("t2")
    //    console.log("che\nck?" + user == m.author)
        const filter = message => message.author == user;
        const collector = m.channel.createMessageCollector(filter, {
            time: ct
        });
        collector.on('collect', m => {
            //got deadline
            status[user.id]["deadline"] = m.content;
            red.set("deadline" + m.channel.name, m.content, redis.print);
            collector.stop()

            var embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`Order Assistant`,
                    "Your request has been sent to our freelancers")
                .setTimestamp();

            m.channel.send({
                embed: embed
            })
            var role;
            var channel = client.channels.get('534388019390578698');

            console.log("role:" + status[user.id]["role"]);
            if (channel.guild.roles.find('name', status[user.id]["role"]) != undefined) {
                role = channel.guild.roles.find('name', status[user.id]["role"]).toString()
            } else {
                role = "undefined"
            }

            var embed = new Discord.RichEmbed()
                .setColor(0xdd2e44)
                .setTitle("Commission")
                .setFooter("Bot by Wqrld#7373")
                //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                //.setImage('https://ferox.host/assets/images/logo.png')
                .addField(`Client`, m.author, true)
                .addField(`Request`, status[user.id]["message"])
                .addField(`Budget`, status[user.id]["budget"], true)
                .addField(`Deadline`, status[user.id]["deadline"], true)
                .addField(`Role`, role, true)
                .addField(`ID`, m.channel.name, true)
                //    .addBlankField()
                //     .addField(`Status`, "Awaiting claim")
                .setTimestamp();
            channel.send({
                embed: embed
            }).then(function(m) {
                channel.send(role)
                m.react("✅");
            });


        })
    })
}

function welcomemsg(username, c, callback) {
    var embed = new Discord.RichEmbed()
        .setColor('#36393f')
        .addField(`Hey ${username}!`,
            `I will guide you through your ordering process.

        Possible services:

-<@&518425577611329546>
-<@&521064310022340629>
-<@&521064274617958411>
-<@&518425578236542976>
-<@&518425578748248095>
-<@&521068354434236428>
-<@&518425576273477632>
-<@&518425577003417610> (trailer maker)
-<@&518425580236963850>
-<@&518425579406753803>
-<@&521064548761862145>

Please mention the role that matches with the service you need.

If you have any questions do -question and our support representatives will help you out.
`)
        .setTimestamp();

    c.send({
        embed: embed
    }).then(function(message) {
        callback(message);
    })
}


client.on('messageReactionAdd', (reaction, user) => {
    status[user.id] = {};
    message = reaction.message;
    message.author = user;

    // if (user.bot) return;
    if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "ticket-creation")) {
        return
    };
    if (reaction.emoji.name !== "🎟" || user.bot) {
        return
    }
    reaction.remove(user);
var nid = ("" + Math.random() * 1000 + "").substring(0, 4);
 //   if (message.guild.channels.exists("name", "ticket-" + utils.shorten(message.author.id))) {
   //     return
  //  }


  red.get(
    "ticketcount" + user.id,
    function(err, count) {
if(count == null || parseInt(count) < 4){
if(count == null){
    red.set("ticketcount" + user.id, 1, redis.print);
}else{
    red.incr("ticketcount" + user.id, redis.print);
}


    message.guild.createChannel(`ticket-${nid}`, "text", [{
        deny: ['SEND_MESSAGES', 'READ_MESSAGES'],
        id: message.guild.id
       


    }]).then(c => {
        c.setParent('518411134953586690');
        
        utils.createchannel(reaction.message, c, function(){



            welcomemsg(reaction.message.author.username, c, function(message) {
                ticketchannel = message;
    
                // Wait for role and requirement
                var userfilter = m => m.author == user;
                var rolecollector = message.channel.createMessageCollector(userfilter, {
                    time: ct
                });


                c.send("<@" + reaction.message.author.id + ">").then(function(messy) {
                    messy.delete();
                    
                })



                rolecollector.on('collect', m => {
    
                    //check if role is mentioned
                    
                    console.log(m.mentions.roles);
                    if (m.mentions.roles.first() == undefined) {
                        // status[user.id]["role"] = "not specified"
                        // console.log("nonspecified")
                        // red.set("role" + m.channel.name, "not specified", redis.print);

m.channel.send("Invalid role");
                        
                    } else {
                        console.log(m.mentions.roles.first().name)
                        rolecollector.stop();
                        status[user.id]["role"] = m.mentions.roles.first().name
                        red.set("role" + m.channel.name, m.mentions.roles.first().name, redis.print);
                    
                    
    
                    //reply with mentioned role
    
    
                    m.channel.send({
                        embed: utils.createembed(message.author.username, "Please specify your needs now.")
                    })
    
    
                    var filter = m => m.author == user;
                    var collector = message.channel.createMessageCollector(filter, {
                        time: ct
                    });
                    collector.on('collect', m => {
                        
    
                        //replace tag with name
    if(m.content.length < 1000){
        collector.stop();
    
        status[user.id]["message"] = m.content
        red.set("message" + m.channel.name, m.content, redis.print);
    
    //    var channel = client.channels.get('518433045330526243');
    
        //ask for budget
        m.channel.send({
            embed: utils.createembed(message.author.username, "Do you have a budget? Say 'quote' if not, specify it if yes.")
        }).then(function(m) {
            
    
    
            const filter = m => m.author == user;
            const collector = message.channel.createMessageCollector(filter, {
                time: ct
            });
    
    
            collector.on('collect', m => {
                collector.stop();
                status[user.id]["budget"] = m.content;

                red.set("budget" + m.channel.name, m.content, redis.print);


                m.channel.send({
                    embed: utils.createembed(message.author.username, "Would you like to pay 50/50 or 100% upfront?\nPlease say `50/50` or `100%`")
                }).then(function(m) {

                const filter = m => m.author == user;
                const collector = message.channel.createMessageCollector(filter, {
                    time: ct
                });

                collector.on('collect', m => {
                    collector.stop();

if(m.content.indexOf("5") !== -1){
    red.set("5050" + c.name, "5050", redis.print);

}else{

}
                    
                requestdeadline(user, m);
                });


            });








            });
    
        });
    }else{
        m.channel.send("Please use a message under 1000 characters or use https://hastebin.com")
    }
    
                    });

                }

                })
            });
           
            red.set("client" + c.name, reaction.message.author.id, redis.print);
        });
        

    });

}else{
    user.send("You already have too many tickets opened.")
}
    });
});





client.login(config.bot_token);