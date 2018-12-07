var paypal = require('paypal-rest-sdk');
var item = require('../item.json');
var config = require('../config.json');
const fetch = require('node-fetch');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});


module.exports.run = async (Discord, bot, message, args) => {
    if (message.channel.topic != '' && message.channel.topic != null) {
        message.channel.send("a invoice has already been generated:\nhttps://www.paypal.com/invoice/p#" + message.channel.topic)
        return;
    }

    const email = message.content.split(" ")[1];
    const price = message.content.split(" ").slice(2).join(" ");

    if(!email || !price){
        message.channel.send("usage: `-pay email price`");
        return;
    }
    message.react('✅');

    item.items[0].name = "Matrix Studio"        
    item.billing_info[0].email = parseInt(message.content.split(" ")[1]);
    item.items[0].unit_price.value  = message.content.split(" ").slice(2).join(" ");

    paypal.invoice.create(item, function(error, invoice) {
        console.log(JSON.stringify(error));
        paypal.invoice.send(invoice.id, function(error, rv) {
message.channel.setTopic(invoice.id);
var encoded = invoice.links[4].href.replace('#', '%23')
let embed = new Discord.RichEmbed()
.setColor("#7289DA")
.setTitle("Matrix Studios | Invoice")     
.addField(`We have created an invoice with the following amount: **_€${price},-_**\nPlease pay here:`, `**<${invoice.links[4].href}>**`)
.addField(`Please read our terms of service:`, "oof\n\nBy paying you automatically agree to our TOS")
.setThumbnail(`https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${encoded}`)
.setTimestamp();
        message.channel.send({
            embed: embed
        });
            //https://github.com/paypal/PayPal-node-SDK/tree/master/samples/invoice

});
});

}



module.exports.command = {
  name:"envyus",
  info:"Creates and sends a invoice `-invoice (email) (amount)`"
}
