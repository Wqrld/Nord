
module.exports.run = async (Discord, client, message, args) => {

 
            message.channel.setParent('518412056924389381');
        

const embed = new Discord.RichEmbed()
.setColor('#36393f')
.addField(`Hey ${message.author.username}!`,
    `Thanks for dealing with us, you will receive 45 days of support after buying a product.`)
.setTimestamp();

message.channel.setName("complete-" + message.author.id)


message.channel.send({
    embed: embed
})


}

module.exports.command = {
  name:"complete"
}