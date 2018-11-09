function shorten(text) {

    return text.substring(0, 4);
}
function createchannel(message, c){
            let role = message.guild.roles.find("name", "💬 | Support Team");
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
module.exports.run = async (Discord, client, message, args) => {

 const reason = message.content.split(" ").slice(1).join(" ");
        //     if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + shorten(message.author.id))) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${shorten(message.author.id)}`, "text").then(c => {
            c.setParent('483729619850100738');
            createchannel(message, c);


            message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.\nReason: ${reason}`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console

}

module.exports.command = {
  name:"new"
}