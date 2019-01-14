module.exports.run = async (Discord, client, m, args) => {

    if (m.member.hasPermission("KICK_MEMBERS")) {
        if(!m.mentions[0]){
            return m.channel.send("specify a user to kick")
        }
        m.mentions[0].ban({
          reason: 'They were bad!',
        }).then(() => {
          m.channel.send(m.mentions[0].username + " banned.");
        });
      } else {
        m.channel.send("You don't have permission to kick.");
      }

}

module.exports.command = {
  name:"kick",
  info:"Add someone to your ticket"
}