var redis = require("redis"),
    red = redis.createClient();
function shorten(text) {

    return text.substring(0, 4);
}
module.exports.run = async (Discord, client, message, args) => {

 
            message.channel.setParent('518412056924389381');
        

const embed = new Discord.RichEmbed()
.setColor('#36393f')
.addField(`Hey ${message.author.username}!`,
    `Thanks for dealing with us, you will receive 45 days of support after buying a product.`)
.setTimestamp();

message.channel.setName("complete-" + shorten(message.author.id))


message.channel.send({
    embed: embed
})

// red.get("freelancer." + message.channel.name, function(err, freelancer) {

// message.channel.send(`<@&518444471936090112>, payouts are needed:\n
// <@` + freelancer + `>`)

// });
 }

module.exports.command = {
  name:"complete"
}