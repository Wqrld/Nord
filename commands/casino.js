module.exports.run = async (discord, client, message, commands) => {

var possibilities = [":gem:", ":lemon:", ":seven:", ":bell:", ":cherries:", ":star:"];


function randomitem(){
	return possibilities[Math.floor(Math.random() * possibilities.length)]
}
function row(){

	return `${randomitem()} ${randomitem()} ${randomitem()}`
}
function runslots(){
    const embed = new discord.RichEmbed()
        .setColor("#FE0101")
        .setTitle(`[ :slot_machine: ${message.author.tag} launched the casino! :slot_machine: ]`)
        .addField("**-------------------**", "** **")
        .addField(`${row()} \n \n${row()}**<** \n \n${row()}`, `** **`)
        .addField("**-------------------**", "** **")
        .setDescription("** **")
        return embed;
}



    message.channel.send(runslots()).then((m) => {

setTimeout(function() {m.edit(runslots())
setTimeout(function() {m.edit(runslots())
setTimeout(function() {m.edit(runslots())
setTimeout(function() {m.edit(runslots())}, 
  900);
}, 700);   
  }, 500);
  }, 300);

    })

}

module.exports.command = {
  name:"casino",
  info:"Pulls the slot machine"
}