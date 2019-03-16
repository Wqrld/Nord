var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var moment = require('moment');
module.exports.run = async (Discord, client, message, commands, args) => {

 if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply("This command can onyl be used by staff members");
            message.react('❌');
            return;
        }
        const embed = new Discord.RichEmbed()
        .setColor(0xdd2e44)
        .setTitle("Nord")
        .setFooter("Order")
        .setThumbnail(`https://cdn.discordapp.com/icons/517394741911093268/dcb6541de2cfe06300aa132a40b8cbff.webp`)
        //.setImage('https://ferox.host/assets/images/logo.png')
        .addField(`Order` , ` React with 🎟 to open a ticket.`)
        .setTimestamp();
    message.channel.send({
        embed: embed
    }).then(function(m){
m.react("🎟");
//done
    });

}

module.exports.command = {
  name:"init"
}