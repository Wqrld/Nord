//client.commands = new Discord.Collection();

module.exports = function(commands) {

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
        client.commands.set(props.command.name, props);

    });
});
}
