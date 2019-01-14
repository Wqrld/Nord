
module.exports.run = async (Discord, client, message, args) => {

 if(message.channel.topic != undefined){
            message.channel.setParent('518411452470525963');
           

            const embed = new Discord.RichEmbed()
            .setColor('#36393f')
            .addField(`Hey ${message.author.username}!`,
                `Thanks for your payment. Our freelancer will get started now`)
            .setTimestamp();
          
          
          
            
          message.channel.send({
                embed: embed
            })




 }else{
 
  const embed = new Discord.RichEmbed()
  .setColor('#36393f')
  .addField(`Hey ${message.author.username}!`,
      `Please pay first using -invoice`)
  .setTimestamp();



  
message.channel.send({
      embed: embed
  })
 }

}

module.exports.command = {
  name:"pending"
}