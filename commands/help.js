module.exports.run = async (Discord, client, message, commands) => {

                const embed = new Discord.RichEmbed()
            .setColor(0x3366ff)
            .setFooter("Bot by Wqrld")
for (var [key, value] of commands) {
  embed.addField(key, value)
}

              
        message.channel.send({
            embed: embed
        });
    

}

module.exports.command = {
  name:"help",
  info:"Shows all loaded commands"
}