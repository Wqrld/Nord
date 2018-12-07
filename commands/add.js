module.exports.run = async (Discord, client, message, args) => {

        if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        const user = message.mentions.users.first();


        if (!user) {
            return message.channel.send("user not found");
        }
        message.channel.overwritePermissions(user, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send("added " + user.name);

    

}

module.exports.command = {
  name:"add",
  info:"Add someone to your ticket"
}