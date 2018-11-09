


const codes = {
    "KekeYt": "10%",
};
module.exports.run = async (Discord, client, message, args) => {

        if (!message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't use the close command outside of a order channel. Please make one with -order`);
        var code = message.content.split(" ").slice(1).join(" ");
        if (!codes[code]) {
            message.channel.send("not a valid code");
            return;
        }
        const embed = new Discord.RichEmbed()
            .setColor(0xCF40FA)
            .setTitle("Code Applied")
            .setFooter("Bot by Wqrld")
            .addField(`Code: ${code}`, `This is worth: \`${codes[code]}\``)
            .setTimestamp();
        message.channel.send({
            embed: embed
        });
    

}

module.exports.command = {
  name:"code",
  info:"Applies a coupon code"
}