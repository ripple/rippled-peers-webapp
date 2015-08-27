var http    = require('superagent')
var Promise = require('bluebird')
var config  = require('../config')

module.exports = {
  
  fetch: function() {
    return new Promise(function(resolve, reject) {
      http
        .get(config.PEERS_API_URL+'/graph')
        .end(function(error, response) {
          if (error) {
            reject(error)
          } else {
            resolve(response.body)
          }
        })
    })
  }
}
