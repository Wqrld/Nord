module.exports.run = async (Discord, client, message, commands, args) => {


  await message.delete().catch(() => {});

  args.amount = Math.abs(args[1]);
  let messages = await message.channel.fetchMessages({
    limit: args.amount && args.amount < 100 ? args.amount : 100
  });

  let user;
  if (message.mentions.users.size) {
    user = message.mentions.users.first();
  }


  if (user) {
    messages = messages.filter(message => message.author.id === user.id);
  }

console.log(messages);
  message.channel.bulkDelete(messages, true)
  .then(clearedMessages => {
    
    message.channel.send({
      embed: {
        color: 0x00cc00,
        description: `I've cleared ${clearedMessages.size} messages from ${user ? user : args.bots ? 'BOTs' : 'everyone'}.`
      }
    }).then(msg => {
      msg.delete(5000).catch(() => {});
    })
    
    console.log(`Bulk deleted ${messages.size} messages`)})
  .catch(console.error);



}

module.exports.command = {
  name:"clear",
  info:"Clears (amount) messages`-clear 5 @Wqrld`"
}