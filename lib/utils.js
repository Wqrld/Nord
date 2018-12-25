const Discord = require("discord.js");
module.exports.createchannel = function(message, c) {

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
module.exports.shorten = function(text) {
    return text.substring(0, 4);
}

module.exports.createembed = function(username, message) {
    var embed = new Discord.RichEmbed()
        .setColor('#36393f')
        .addField(`Hey!`,
            message)
        .setTimestamp();


    return embed

}