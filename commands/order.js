
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

 var reason = message.content.split(" ").slice(1).join(" ");
       // if (message.guild.channels.exists("name", "order-" + shorten(message.author.id))) return message.channel.send(`You already have a order open.`);

       var id = "" + Math.random() * 1000 + "".substring(0, 4);
        message.guild.createChannel(`order-${id}`, "text").then(c => {
            c.setTopic(reason)
            c.setParent('495344580237983747');
            createchannel(message, c);;
            if (!reason) {
                reason = "not specified"
            }

            message.channel.send(`:white_check_mark: Your order has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setTitle("Order")
                .setFooter("Bot by Wqrld")
                .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                .addField(`Type`, `Please react with :red_circle: if you want to use our automated ordering process \n :large_blue_circle: if you want to talk to a real person\nTo pay for a invoice react with :black_circle:`)
                .setTimestamp();
            c.send({
                embed: embed
            }).then(question => {
question.react("🔵"); //human blue
question.react("🔴"); //bot red
question.react("⚫"); //invoice black
            
const human = (reaction, user) => reaction.emoji.name === "🔵" && !user.bot;
const humanc = question.createReactionCollector(human, { time: 30000 });
const bot = (reaction, user) => reaction.emoji.name === "🔴" && !user.bot;
const botc = question.createReactionCollector(bot, { time: 30000 });
const invoice = (reaction, user) => reaction.emoji.name === "⚫" && !user.bot;
const invoicec = question.createReactionCollector(invoice, { time: 30000 });


humanc.on('collect', async reaction => {
            const embed = new Discord.RichEmbed()
                .setColor(0x55acee)
                .setTitle("Order")
                .setFooter("Bot by Wqrld")
                .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                .addField(`Hey ${message.author.username}!`, `Please note down any special information about what you need, a Support representative will make a invoice for you.`)
                .addField(`Item`, `${reason}`)
                .setTimestamp();
            c.send({
                embed: embed
            });

});

invoicec.on('collect', async reaction => {
            const embed = new Discord.RichEmbed()
                .setColor(0x292f33)
                .setTitle("Invoice")
                .setFooter("Bot by Wqrld")
                .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                .addField(`Sorry, this is work in progress`, `Please note down any special information about what you need, a Support representative will make a invoice for you.`)
                .addField(`Item`, `${reason}`)
                .setTimestamp();
            c.send({
                embed: embed
            });

});


botc.on('collect', async reaction => {
            const embed = new Discord.RichEmbed()
                .setColor(0xdd2e44)
                .setTitle("Bot Order")
                .setFooter("Bot by Wqrld")
                .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                .addField(`Sorry, this is work in progress`, `Please note down any special information about what you need, a Support representative will make a invoice for you.`)
                .addField(`Item`, `${reason}`)
                .setTimestamp();
            c.send({
                embed: embed
            });

});




});

});
}

module.exports.command = {
  name:"order",
  info:"Opens the interactive ordering system"
}