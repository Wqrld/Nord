const fetch = require('node-fetch');

module.exports.run = async (Discord, client, message, args) => {

var apikey = "CF API key";

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

}

module.exports.command = {
  name:"domain",
  info:"Creates a free subdomain **WIP**"
}