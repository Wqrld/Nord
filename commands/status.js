var paypal = require('paypal-rest-sdk');
var item = require('../item.json');
var config = require('../config.json');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});


module.exports.run = async (Discord, client, message, args) => {

        if (message.channel.topic == undefined) {
            message.channel.send("no invoice generated")
        } else {
            paypal.invoice.get(message.channel.topic, function(error, invoice) {
                message.react('✅');
            //    message.channel.send("Status: `" + invoice.status + "`")



                const embed = new Discord.RichEmbed()
                .setColor(0xdd2e44)
                .setTitle("Invoice status")
                .setFooter("Invoice status")
               // .setThumbnail(`https://ferox.host/assets/images/logo.png`)
                //.setImage('https://ferox.host/assets/images/logo.png')
                .addField(`Status`, invoice.status)
                .setTimestamp();
            message.channel.send({
                embed: embed
            });


            });
        }
    

}

module.exports.command = {
  name:"status"
}