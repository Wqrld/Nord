
module.exports.run = async (Discord, client, message, args) => {



        

  price = message.content.split(" ")[1];
var embed = new Discord.RichEmbed()
                .setColor(0xdd2e44)
                .setTitle("Commission")
                .setFooter("Bot by Wqrld#7373")
.addField("Freelancer", 0.90 * price)
.addField("sales rep", 0.05 * price, true)
.addField("company", 0.05 * price, true)
                .setTimestamp();
            message.channel.send({
                embed: embed
            })
};
    



module.exports.command = {
  name:"cut"
}