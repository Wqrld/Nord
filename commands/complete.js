var redis = require("redis"),
    red = redis.createClient();


module.exports.run = async (Discord, client, message, args) => {
    console.log(message.author.name);
    if (
        message.member.roles.find("name", "Owner") == undefined &&
        message.author.id != "159302240929054720"
    ) {
        const embed = new Discord.RichEmbed()
            .setColor("#36393f")
            .addField(
                `Hey ${message.author.username}!`,
                `Only a CEO is allowed to execute this command.`
            )
            .setTimestamp();

        message.channel.send({
            embed: embed
        });
        return;
    }

    message.channel.setParent("518412056924389381");

    red.get(
        "client" + message.channel.name.replace("complete", "ticket"),
        function(err, client) {
            message.channel.overwritePermissions(
                message.guild.members.find("id", client), {
                    SEND_MESSAGES: false,
                    READ_MESSAGES: false
                }
            );
        }
    );

    const embed = new Discord.RichEmbed()
        .setColor("#36393f")
        .addField(`Hey ${message.author.username}!`, `Commission complete.`)
        .setTimestamp();

    //red.get("deadline" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
    red.get(
        "freelancer" + message.channel.name.replace("complete", "ticket"),
        function(err, freelancer) {

            red.get(
                "salesrep" + message.channel.name.replace("complete", "ticket"),
                function(err, rep) {


            red.get(
                "client" + message.channel.name.replace("complete", "ticket"),
                function(err, client) {


                    red.get(
                        "closed" + message.channel.id,
                        function(err, closed) {
if(closed != "tr"){
                            red.set("closed" + message.channel.id, "tr", redis.print);
                            red.decr("ticketcount" + client, redis.print);
}

                        });


                    red.get(
                        "price" + message.channel.name.replace("complete", "ticket"),
                        function(err, price) {
                            //test

                            red.get("paypal." + freelancer, function(err, paypal) {
                                console.log("paypal" + freelancer);
                                console.log("price" + message.channel.name + paypal);
                                if (price == null) {
                                    price = "not specified";
                                }
                                if (paypal == null) {
                                    paypal = "not specified";
                                }
                                embed.addField("Freelancer", paypal);

if(rep == null){
                                embed.addField("Freelancer", 0.95 * price + "$", true);
                                embed.addField("Company", 0.05 * price + "$", true);
}     else{
    embed.addField("Freelancer", 0.90 * price + "$", true);
    embed.addField("Sales Rep", 0.05 * price + "$", true);
    embed.addField("Company", 0.05 * price + "$", true);
}           
                                
                                embed.setFooter(client);
                                message.channel.send({
                                    embed: embed
                                });
                            });
                        }
                    );
                }
            );
            });
    }
    );

    // red.get("message" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
    // red.get("freelancer." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
    // red.get("role" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
    var id = ("" + Math.random() * 1000 + "").substring(0, 4);
    message.channel.setName("complete-" + id);
    
    // red.get("freelancer." + message.channel.name, function(err, freelancer) {

    // message.channel.send(`<@&518444471936090112>, payouts are needed:\n
    // <@` + freelancer + `>`)

    // });
};

module.exports.command = {
    name: "complete"
};