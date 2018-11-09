module.exports.run = async (Discord, bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Informatie")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Naam", message.guild.name)
    .addField("Gemaakt op", message.guild.createdAt)
    .addField("Jij joinde op", message.member.joinedAt)
    .addField("Totaal aantal leden", message.guild.memberCount);

    message.channel.send(serverembed);
}