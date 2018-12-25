var paypal = require('paypal-rest-sdk');
const fs = require("fs");
const Discord = require("discord.js");
var item = require('../item.json');
var config = require('../config.json');
paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});
module.exports = async function(app, client){

    app.get('/paypalhook', function(req, res) {
        res.send('hello world2')
        var orders = client.channels.get('518411134953586690');
        var children = orders.children.array();
    
        children.forEach(function(channel, i) {
    
            /*      if (channel.topic == undefined) {
               //   channel.send("Status: **Awaiting order**")
              } else {
                */
            console.log(channel.topic);
            if (channel.topic != undefined) {
    if(channel.topic.indexOf("Paid") == -1 ){
        console.log("payment received from someone")
                paypal.invoice.get(channel.topic, function(error, invoice) {
                    console.log(invoice.status)
                    if (invoice.status == "PAID") {
                        if (channel.topic.indexOf("Paid") == -1) {
                            channel.send("Status: **" + invoice.status + "**")
    
                            channel.setTopic(channel.topic + " Paid");
                        }
                    }
    
    
                });
    
            }
    
    
            }
    
    
    
        });
    });

}