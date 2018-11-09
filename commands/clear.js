module.exports.run = async (Discord, client, message) => {

message.delete().catch(() => {});

   var amount = Math.abs(message.content.split(" ").slice(1));
    let messages = await message.channel.fetchMessages({
      limit: amount && amount < 100 ? amount : 100
    });
 
    let user;
    if (message.mentions.users.size) {
      user = message.mentions.users.first();
    }
    if (user) {
      messages = messages.filter(message => message.author.id === user.id);
    }
    message.channel.bulkDelete(messages, true);
    message.reply(amount + " Messages cleared")
// @Usage Clear 5 @Wqrld


}

module.exports.command = {
  name:"clear"
}