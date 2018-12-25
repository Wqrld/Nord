var redis = require("redis"),
    red = redis.createClient();
function shorten(text) {

    return text.substring(0, 4);
}
module.exports.run = async (Discord, client, message, args) => {
    console.log(message.author.name);
    if (message.member.roles.find('name', 'CEO') == undefined && message.author.id != '159302240929054720') {
    
        const embed = new Discord.RichEmbed()
        .setColor('#36393f')
        .addField(`Hey ${message.author.username}!`,
            `Only a CEO is allowed to execute this command.`)
        .setTimestamp();
        
    
        
            message.channel.send({
                embed: embed
            })
return;
    }

 
            message.channel.setParent('518412056924389381');
        
            red.get("client" + message.channel.name.replace("complete", "ticket"), function(err, client) {
    message.channel.overwritePermissions(message.guild.members.find('id', client), {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
    });
            });




const embed = new Discord.RichEmbed()
.setColor('#36393f')
.addField(`Hey ${message.author.username}!`,
    `Commission complete.`)
.setTimestamp();





//red.get("deadline" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
red.get("client" + message.channel.name.replace("complete", "ticket"), function(err, client) {
red.get("price" + message.channel.name.replace("complete", "ticket"), function(err, price) {
    
    console.log("price" + message.channel.name);
    if(price == null){price = "not specified"}
    
    
    embed.addField("Payout", 0.95 * price + "$");
embed.setFooter(client);
    message.channel.send({
        embed: embed
    })



});
});



 // red.get("message" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
 // red.get("freelancer." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
 // red.get("role" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});



message.channel.setName("complete-" + shorten(message.author.id))




// red.get("freelancer." + message.channel.name, function(err, freelancer) {

// message.channel.send(`<@&518444471936090112>, payouts are needed:\n
// <@` + freelancer + `>`)

// });
 }

module.exports.command = {
  name:"complete"
}