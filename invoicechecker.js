var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
var apirouter = express.Router();

apirouter.post('/paypalhook/', (req, res) => {
    var orders = client.channels.get('495344580237983747');
var children = orders.children.array();

children.forEach(function(channel, i){

            if (channel.topic == undefined) {
            channel.send("Status: **Awaiting order**")
        } else {
            paypal.invoice.get(channel.topic, function(error, invoice) {
                if(invoice.status == "SENT"){
channel.send("Status: **Awaiting payment**")
                }else{
                    channel.send("Status: **" + invoice.status + "**")
                }
                

            });
        }
})
