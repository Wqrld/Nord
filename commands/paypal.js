var redis = require("redis"),
    red = redis.createClient();
module.exports.run = async (Discord, client, message, args) => {

  var arg = message.content.split(' ');


  red.set("paypal." + message.author.id, arg[1], redis.print);

var embed = new Discord.RichEmbed()
            .setColor('#36393f')
            .addField(`Paypal set`,
                "paypal set to: " + arg[1])
            .setTimestamp();
        message.channel.send({
            embed: embed
        }).then(function(m){
          setTimeout(function () {
            m.delete()
            message.delete();
          }, 3000)



        })


}

module.exports.command = {
  name:"paypal"
}