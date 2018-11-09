module.exports.run = async (Discord, client, message, args) => {

        message.channel.send(`Fetching!`).then(m => {
            message.react('✅');
            m.edit(`**Bot** - ` + (m.createdTimestamp - message.createdTimestamp) + `ms.` + ` \n**Discord API** - ` + Math.round(client.ping) + `ms.`);
        });
    

}

module.exports.command = {
  name:"ping"
}