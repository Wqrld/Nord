var async = require("async");
var tcpp = require('tcp-ping');


module.exports.run = async(Discord, client, message, args) => {
    const loading = client.emojis.get("530328271863414784");
    var nodes = {
        1: "node1.rhmc.nl",
        2: "node2.rhmc.nl",
        3: "node3.rhmc.nl",
        4: "node4.rhmc.nl"
    }
    var sites = {
        5: "royalehosting.be",
        6: "pterodactyl.rhmc.nl"
    }
    var status = {
        1: loading,
        2: loading,
        3: loading,
        4: loading,
        5: loading,
        6: loading
    }

    function createembed() {
        return embed = new Discord.RichEmbed()
            .setColor(0xdd2e44)
            .setTitle("Status")
            .setFooter("Status")
            .setThumbnail(`https://ferox.host/assets/images/logo.png`)
            //.setImage('https://ferox.host/assets/images/logo.png')
            .addField(`Nodes`, `
    Node 1: ${status[1]}
    Node 2: ${status[2]}
    Node 3: ${status[3]}
    Node 4: ${status[4]}
    
    
    `)
            .addField(`Sites`, `
    Site: ${status[5]}
    Panel: ${status[6]}
    `)
            .setTimestamp();
    }


    message.channel.send({
        embed: createembed()
    }).then(function(m) {

        status[1] = "✅";

        m.edit({
            embed: createembed()
        })

        async.forEachOf(nodes, (value, key, callback) => {

            tcpp.ping({
                address: value,
                port: 8080,
                timeout: 300
            }, function(err, data) {
                console.log(data)
                if (data.max == undefined) {
                    status[key] = "🔴";
                } else {
                    status[key] = "✅" + data.results[0].time + "ms";
                }
                m.edit({
                    embed: createembed()
                })

            });
        });
        async.forEachOf(sites, (value, key, callback) => {

            tcpp.ping({
                address: value,
                port: 443,
                timeout: 300
            }, function(err, data) {
                console.log(data)
                if (data.max == undefined) {
                    status[key] = "🔴";
                } else {
                    status[key] = "✅" + data.results[0].time + "ms";
                }
                m.edit({
                    embed: createembed()
                })

            });
        });

    });


}

module.exports.command = {
    name: "nstatus"
}