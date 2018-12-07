const fetch = require('node-fetch');
const ipRegex = require('ip-regex');
var config = require('../config.json')
var apikey = config.cf_key;
module.exports.run = async (Discord, client, message, commands, args) => {
console.log("dcheck")
    if(args.length != 4){
        message.channel.send("-domain ip subdomain port");
        return;
    }
    console.log("dcheck passed")
//if(ipRegex().test(args[1])){
var ip = args[1];
//args[1].match(ipRegex())[0];
var subdomain = args[2];
var port = parseInt(args[3]);
var srvbody = { "type":"SRV","name": subdomain + ".ferox.host","data": {"name":`${subdomain}.ferox.host`, "target": "ferox.host", "ttl": 120, "weight": 5, "priority": 0,"service":"_minecraft","proto":"_tcp","port":port},"proxied":false};
//var srvbody = { "type":"SRV","name":"_minecraft._tcp."+subdomain+".","content":"SRV 1 1 "+ port + " " + ip + ".","proxied":false};
//"data" => "{"name":"ss2.minefarm.pw","target":"a-ss.minefarm.pw","service":"_minecraft","proto":"_tcp","port":"25565",}"
console.log(srvbody)
fetch('https://api.cloudflare.com/client/v4/zones/' + config.cf_zone_id +'/dns_records', { 
    method: 'POST',
    body:    JSON.stringify(srvbody),
    headers: { 
        'Content-Type': 'application/json',
        'X-Auth-Email': 'wereld03@gmail.com',
        'X-Auth-Key': apikey 
    },
})
    .then(res => res.json())
    .then(json => {
        
        const embed = new Discord.RichEmbed()
        .setColor(0xdd2e44)
        .setTitle("Domain Created")
        .setFooter("Domain created")
        .setThumbnail(`https://ferox.host/assets/images/logo.png`)
        //.setImage('https://ferox.host/assets/images/logo.png')
        .addField(`domain`, subdomain + ".ferox.host")
        .addBlankField()
        .addField('target', 'eu1.ferox.host', true)
        .addField('port', port, true)
        .addField('Please wait', "Please allow up to 24 hours to process this request, it should be done within 120 seconds.")
        .setTimestamp();
    message.channel.send({
        embed: embed
    });
        console.log(JSON.stringify(json));
        
    });



//}

/*
var abody = { "type":"A","name":subdomeinvar+"test.sparemc.nl","content":ipvar,"proxied":false};
fetch('https://api.cloudflare.com/client/v4/zones/dbe9ffab607f6d3cd279144438ab1aa8/dns_records', { 
    method: 'POST',
    body:    JSON.stringify(abody),
    headers: { 
        'Content-Type': 'application/json',
        'X-Auth-Email': 'CF email',
        'X-Auth-Key': apikey 
    },
})
    .then(res => res.json())
    .then(json => console.log(json));

    var srvbody = { "type":"SRV","name":"_minecraft._tcp."+subdomeinvar+".","content":"1 1 "+ portvar + ipvar,"proxied":false};
fetch('https://api.cloudflare.com/client/v4/zones/-je zone-/dns_records', { 
    method: 'POST',
    body:    JSON.stringify(srvbody),
    headers: { 
        'Content-Type': 'application/json',
        'X-Auth-Email': 'CF email',
        'X-Auth-Key': apikey 
    },
})
    .then(res => res.json())
    .then(json => console.log(json));

}*/
}
module.exports.command = {
  name:"domain",
  info:"Creates a free subdomain **WIP**"
}