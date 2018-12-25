const Discord = require("discord.js");
module.exports = function(client) {

    client.on("guildMemberUpdate", function(old, newmember) {
        if (old.guild.name != "Nord") {
            return
        }
        if (old.roles.find('name', 'Freelancer') == undefined) {
            if (newmember.roles.find('name', 'Freelancer') != undefined) {
                //new freelancer
    
                newmember.send("welcome to NORD\nPlease specify your paypal email address by typing `-paypal (mail)` in one of our channels.")
    
            }
        }
    
    
    
    })
    

}