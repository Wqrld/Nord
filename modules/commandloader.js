//client.commands = new Discord.Collection();
const Discord = require("discord.js");
module.exports = function(client, commands) {
    var config = require('../config.json');
var fs = require("fs")
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Oops, no commands!");
        return;
    }

    console.log(`Loading ${jsfiles.length} command(s)!`);

    jsfiles.forEach((f, i) => {
        let props = require(`../commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        if (props.command.info != undefined) {
            commands.set(props.command.name, props.command.info);
        } else {
            commands.set(props.command.name, "-" + props.command.name);
        }
     commands.set(props.command.name, props);

    });
});



client.on("message", (message) => {
    console.log("command requested")

    if (!message.content.startsWith(config.prefix) || message.channel.type == "dm" || message.author.bot) {
        return
    };
    let args = message.content.trim().split(' ');
    //   let cmd = client.commands.get(message.content.slice(1));
    console.log(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    let cmd = commands.get(message.content.slice(1).split(" ").slice(0, 1).join(" "));
    if (cmd) cmd.run(Discord, client, message, commands, args);

});


}
