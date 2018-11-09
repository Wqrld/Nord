var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var moment = require('moment');

module.exports.run = async (Discord, client, message, args) => {

 if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply("naaha");
            message.react('❌');
            return;
        }
        message.react('✅');
        db.all("SELECT * FROM orders;", [], (err, rows) => {
            rows.forEach((row) => {
                message.channel.send(`${row.username} has item ${row.item} with price ${row.price} due at ${row.due}`);

                if (moment() > moment(row.due)) {
                    message.channel.send(`**${row.username} has item ${row.item} with price ${row.price} due at ${row.due} is overdue**`);
                }

            });
        });
}

module.exports.command = {
  name:"listorders"
}