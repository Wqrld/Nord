var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');


module.exports.run = async (Discord, client, message) => {
  if (!message.member.permissions.has("KICK_MEMBERS")) {
            return message.reply("naaha")
        }
        var args = message.content.split(" ").slice(1);
        if(args.length != 4){
             
            return;
        }
        var sql = `INSERT INTO orders VALUES (${(new Date).getTime()}, "${args[0]}", "${args[1]}", ${args[2]}, "${args[3]}")`
        console.log(sql)

        db.all(sql, [], (err, rows) => {
            message.react('✅');
            if (err) {
                message.react('❌');
            };
        });
    

}

module.exports.command = {
  name:"registerorder"
}