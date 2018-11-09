module.exports.run = async (Discord, client, message, args) => {

  var username = message.content.split(" ").slice(1).join(" ");
        if(message.mentions.users.first()){
            message.channel.send("Please use his discord name without tag");
            return;
        }
        
        user = client.users.find(user => user.username === username);
        var amount = 10;
        var enddate = "some day";
        if (!user) {
            return message.channel.send(`User ${username} not found.`)
        }
        message.react('✅');
        user.sendMessage(`Dear ${username}, You will need to pay your invoice of €${amount} before ${enddate} to continue using this service.`);
        message.channel.send(`\`Dear ${username}, You will need to pay your invoice of €${amount} before ${enddate} to continue using this service.\``)
    

}

module.exports.command = {
  name:"remind",
  rank:"staff"
}