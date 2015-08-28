var http    = require('superagent')
var Promise = require('bluebird')
var config  = require('../config')

module.exports = {

  fetch: function() {
    return new Promise(function(resolve, reject) {
      http
        .get(config.PEERS_API_URL+'/peers')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body.peers)
          }
        })
    })
  },

  sortByUptime: function(peers) {
    peers.sort(function(a, b){
      var uptime_a = a.uptime ? a.uptime : -1;
      var uptime_b = b.uptime ? b.uptime : -1;
      if (uptime_b !== uptime_a) return uptime_b - uptime_a;
      return b.public_key > a.public_key ? 1 : -1;
    });
    return peers;
  }
}
