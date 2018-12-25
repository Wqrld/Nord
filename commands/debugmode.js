var redis = require("redis"),
    red = redis.createClient();

module.exports.run = async (Discord, client, message, args) => {

  red.get("deadline" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
  red.get("budget" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
  red.get("message" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
  red.get("freelancer." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
  red.get("role" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
 // red.get("budget." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
 // red.get("freelancer." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
  //red.get("deadline." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
// red.get("message." + message.channel.name, function(err, reply) {message.channel.send(reply);}  );
//red.get("freelancer." + message.channel.name, function(err, reply) {message.channel.send(reply);});
//red.get("deadline." + message.channel.name, function(err, reply) {message.channel.send(reply);});


}

module.exports.command = {
  name:"debugmode"
}