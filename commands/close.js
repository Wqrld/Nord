var paypal = require('paypal-rest-sdk');
var item = require('../item.json');
var config = require('../config.json');
const fetch = require('node-fetch');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});
var options = {
    "subject": "Ticket closed",
    "note": "Canceling invoice",
    "send_to_merchant": true,
    "send_to_payer": true
};

module.exports.run = async (Discord, client, message, args) => {

  if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        // Confirm delete - with timeout (Not command)

const embed = new Discord.RichEmbed()
                .setColor(0x55acee)
                .setTitle("Close")
                .setFooter("Bot by Wqrld")
                .addField(`Are you sure?`, `Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, react with ✅.`)
                .setTimestamp();
            message.channel.send({
                embed: embed
            })
            .then((m) => {

m.react("✅")

const confirm = (reaction, user) => reaction.emoji.name === "✅" && !user.bot;
const confirmc = m.createReactionCollector(confirm, { time: 30000 });


confirmc.on('collect', async reaction => {
if(message.channel.name.startsWith(`order-`) && message.channel.topic != undefined){


paypal.invoice.get(message.channel.topic, function(error, invoice) {
    if(invoice.status == 'SENT'){
    paypal.invoice.cancel(message.channel.topic, options, function (error, rv) {

paypal.invoice.del(message.channel.topic, function (error, rv) {});

});

}

});



}


m.channel.delete();
});


    
    

});
};
module.exports.command = {
  name:"close"
}