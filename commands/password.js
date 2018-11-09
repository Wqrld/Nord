var xkcdPassword = require('xkcd-password')
var pw = new xkcdPassword()
var options = {
  numWords: 3,
  minLength: 5,
  maxLength: 8
}


module.exports.run = async (Discord, client, message, args) => {



        pw.generate(options, function (err, result) {
        	message.react('✅');
  const user = message.mentions.users.first();
  user.sendMessage("Your password: " + result);
  message.author.sendMessage("His Password: " + result);
})
    

}

module.exports.command = {
  name:"password"
}