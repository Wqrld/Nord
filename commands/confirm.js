module.exports.run = async (Discord, client, message, commands) => {

            var embed = new Discord.RichEmbed()
            .setDescription("**Are you sure you want to do that?**")
            .setColor(0xdd2e44)
          //  .setTitle("Are you ")
            
            //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
            //.setImage('https://ferox.host/assets/images/logo.png')
            
            //    .addBlankField()
            //     .addField(`Status`, "Awaiting claim")
            
        message.channel.send({
            embed: embed
        }).then(function (m){
m.react("✅").then(function (){
m.react("🔴")
});
        })
    

}

module.exports.command = {
  name:"confirm",
  info:"Shows all loaded commands"
}