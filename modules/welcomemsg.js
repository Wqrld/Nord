const Discord = require("discord.js");
module.exports.run = function(username, c, callback) {

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