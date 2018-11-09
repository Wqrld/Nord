var util = require('util')
var mysql      = require('mysql');
var config = require('../config.json')
var sql = mysql.createPool({
    connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : config.db_password,
  database : 'host'
});


module.exports.run = async (Discord, client, message) => {
console.log("sql ran");
var args = message.content.split(" ").slice(1).join(" ");
console.log("a: " + args);
sql.query(args, (err, rows) => {


        if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply("naaha");
            message.react('❌');
            return;
        }
        message.react('✅');
message.channel.send("```\n" + util.inspect(rows) + "\n```");

});
    

}

module.exports.command = {
  name:"sql",
  info:"Executes sql commands"
}