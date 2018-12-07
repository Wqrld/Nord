var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var moment = require('moment');

module.exports.run = async (Discord, client, message, args) => {

 if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply("This command can onyl be used by staff members");
            message.react('❌');
            return;
        }
        const embed = new Discord.RichEmbed()
        .setColor(0xdd2e44)
        .setTitle("Stats")
        .setFooter("Stats")
        .setThumbnail(`https://ferox.host/assets/images/logo.png`)
        //.setImage('https://ferox.host/assets/images/logo.png')
        .addField(`Open tickets`, '0', true)
        .addField(`Open orders`, '0', true)
        .addField(`Total clients`, '5', true)
        .addField(`Income`, 'hidden', true)
        .addBlankField()
        .addField(`Discord members`, message.channel.guild.memberCount, true)
        .addField(`Staff`, '4', true)
        .setTimestamp();
    message.channel.send({
        embed: embed
    });
}

module.exports.command = {
  name:"stats"
}