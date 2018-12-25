const Discord = require("discord.js");
module.exports = async function(client) {

    client.on('guildMemberAdd', member => {
        welcomemsgs = [
            `Welcome to the server, ${member}`,
            `Welcome to the club, ${member}`,
            `Enjoy your stay, ${member}`,
            `Thanks for joining our server, ${member}`
        ]
        const channel = member.guild.channels.find('name', 'general');
        if (!channel) return;
        channel.send(welcomemsgs.random());
    });
    

}