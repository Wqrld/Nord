//Copyright Wqrld#7373, education purposes only. This software may not be sold or used for commerical goals.

// Import the discord.js module
const Discord = require("discord.js");
var redis = require("redis"),
    red = redis.createClient();

var express = require('express')
var app = express()

Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}
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

var utils = require("./lib/utils.js");


const prefix = "-";

client.on("ready", () => {
    client.user.setActivity(config.name, { type: 'STREAMING', url: "https://www.twitch.tv/monstercat" });
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ` + config.name);
});

require("./modules/paypalhook.js")(app, client);
require("./modules/quickrespond.js")(client);
require("./modules/joinmessage.js")(client);


app.listen(1337);

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



const status = {
    "Wqrld": {
        "message": "",
        "budget": ""

    },
};
client.on('messageReactionAdd', (reaction, user) => {

    if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "commissions")) return;
    if (!user.bot && reaction.emoji.name === "✅") {
    
        if (reaction.message.reactions.array().length != 1) {
            return
        }

        var id = reaction.message.embeds[0].fields[5].value;
        var channel = client.guilds.get('517394741911093268').channels.find(c => c.name == id);
        console.log(id + "\n" + channel)
        red.set("freelancer" + reaction.message.channel.name, user.id, redis.print);
        var embed = new Discord.RichEmbed()
            .setColor('#36393f')
            .addField(`Commission claimed`,
                "<@" + user.id + "> Has claimed your comission\nPlease discuss a price and when ready type -invoice (email) (amount)")
            .setTimestamp();
        channel.send({
            embed: embed
        })
        red.set("freelancer" + channel.name, user.id, redis.print);
channel.send("<@" + user.id + ">").then((m) => {
    m.delete();
})
        channel.overwritePermissions(user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });


    }


});



function requestdeadline(user, m) {



    m.channel.send({
        embed: utils.createembed("cake", "What’s your deadline?, if none say \"no\"")
    }).then(function(m) {
        //got deadline
        const filter = m => m.author == user;
        const collector = message.channel.createMessageCollector(filter, {
            time: 15000
        });
        collector.on('collect', m => {
            status[user.id]["deadline"] = m.content;
            red.set("deadline" + m.channel.name, m.content, redis.print);
            collector.stop()

            var embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`Hey ${message.author.username}!`,
                    "Your request has been sent to our freelancers")
                .setTimestamp();

            m.channel.send({
                embed: embed
            })
            var role;
            var channel = client.channels.get('518433045330526243');

            console.log(status[user.id]["role"]);
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
                .addField(`request`, status[user.id]["message"], true)
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
            `Please try explain your request in as much detail as possible. Our **Freelancers** will be here soon to help.\n
        Possible services:\n
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

Please mention one of the above roles

        

        
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

    if (message.guild.channels.exists("name", "ticket-" + utils.shorten(message.author.id))) {
        return
    }


    message.guild.createChannel(`ticket-${utils.shorten(message.author.id)}`, "text").then(c => {
        c.setParent('518411134953586690');
        
        utils.createchannel(reaction.message, c);
        c.send("<@" + reaction.message.author.id + ">").then(function(messy) {
            messy.delete();
            
        })
        red.set("client" + c.name, reaction.message.author.id, redis.print);
        welcomemsg(reaction.message.author.username, c, function(message) {
            ticketchannel = message;

            // Wait for role and requirement
            var userfilter = m => m.author == user;
            var rolecollector = message.channel.createMessageCollector(userfilter, {
                time: 30000
            });
            rolecollector.on('collect', m => {

                //check if role is mentioned
                rolecollector.stop();
                console.log(m.mentions.roles);
                if (m.mentions.roles.first() == undefined) {
                    status[user.id]["role"] = "not specified"
                    console.log("nonspecified")
                    red.set("role" + m.channel.name, "not specified", redis.print);
                } else {
                    console.log(m.mentions.roles.first().name)
                    status[user.id]["role"] = m.mentions.roles.first().name
                    red.set("role" + m.channel.name, m.mentions.roles.first().name, redis.print);
                }
                

                //reply with mentioned role


                m.channel.send({
                    embed: utils.createembed(message.author.username, "A " + m.mentions.roles.first().name + " Will be requested for this commission\n please specify your needs now.")
                })


                var filter = m => m.author == user;
                var collector = message.channel.createMessageCollector(filter, {
                    time: 30000
                });
                collector.on('collect', m => {
                    collector.stop();

                    //replace tag with name

                    status[user.id]["message"] = m.content
                    red.set("message" + m.channel.name, m.content, redis.print);

                    var channel = client.channels.get('518433045330526243');

                    //ask for budget
                    m.channel.send({
                        embed: utils.createembed(message.author.username, "Do you have a budget? Press on the ‘n’ emoji for no, specify it if yes.")
                    }).then(function(m) {
                        m.react("🇳");

                        const nofilter = (reaction, user) => reaction.emoji.name === "🇳" && !user.bot;
                        const reactioncollector = m.createReactionCollector(nofilter, {
                            time: 30000
                        });
                        const filter = m => m.author == user;
                        const collector = message.channel.createMessageCollector(filter, {
                            time: 30000
                        });

                        reactioncollector.on('collect', reaction => {
                            reactioncollector.stop();
                            status[user.id]["budget"] = "quote";
                            red.set("budget" + m.channel.name, "quote", redis.print);
                            requestdeadline(user, reaction.message)
                        });
                        collector.on('collect', m => {
                            collector.stop();
                            status[user.id]["budget"] = m.content;
                            red.set("budget" + m.channel.name, m.content, redis.print);
                            requestdeadline(user, m);
                        });

                    });
                });
            })
        });

    });
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

    if (!message.content.startsWith(prefix) || message.channel.type == "dm" || message.author.bot) {
        return
    };
    let args = message.content.trim().split(' ');
    //   let cmd = client.commands.get(message.content.slice(1));
    console.log(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    let cmd = client.commands.get(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    if (cmd) cmd.run(Discord, client, message, commands, args);

});


// Logs in using the bots token.
client.login(config.bot_token);