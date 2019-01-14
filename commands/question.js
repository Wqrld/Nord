
var redis = require("redis"),
red = redis.createClient();

module.exports.run = async (Discord, client, message) => {
  message.channel.send("<@&518425575661240320>").then(function (m){
    m.delete()
    m.channel.send("Our support representatives have been notified.")
  });
  red.set("question" + message.channel.name, true);

}

module.exports.command = {
  name:"question"
}