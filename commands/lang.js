var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');


module.exports.run = async (Discord, client, message) => {
        var args = message.content.split(" ").slice(1);
message.channel.send("sorry, i gave up on this")
    /*    var sql = `INSERT OR REPLACE INTO users (userid,lang) VALUES (${message.author.id}, "${args[0]}")`
        

        db.all(sql, [], (err, rows) => {
            
            if (err) {
                message.react('❌');
                console.log(err)
            };
            message.react('✅');
            message.channel.send("language set to " + args[0])
        });*/
    

}

module.exports.command = {
  name:"lang",
  info:"**Disabled**"
}