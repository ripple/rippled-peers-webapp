var http    = require('superagent')
var Promise = require('bluebird')
var config  = require('../config')
var _  = require('lodash')
var $ = require('jquery')
require('jquery-ui');

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

  formatUptimes: function(peers) {
    function format(time) {
      if (!time) return {name: '', time: -1};
      var seconds = time;
      var minutes = Math.floor(time / 60);
      seconds -= minutes * 60;
      var hours = Math.floor(minutes / 60);
      minutes -= hours * 60;
      var days = Math.floor(hours / 24);
      hours -= days * 24;
      var dayName = days + ' ' + 'Day' + (days > 1 ? 's' : '');
      var hourName = hours + ' ' + 'Hour' + (hours > 1 ? 's' : '');
      var minName = minutes + ' ' + 'min';
      var secName = seconds + ' ' + 'sec';

      if (days > 0) return { name: dayName, time: days * 60 * 60 * 24 };
      else if (hours > 0) return { name: hourName, time: hours * 60 * 60 };
      else if (minutes > 0) return { name: minName, time: minutes * 60 };
      else return { name: secName, time: seconds };
    }

    _.map(peers, function(p) {
      var f = format(p.uptime);
      p.uptime_truncated = f.time;
      p.uptime_formatted = f.name;
    });
    return peers;
  },

  sortByUptime: function(peers) {
    peers.sort(function(a, b) {
      var uptime_a = a.uptime_truncated || a.uptime || -1;
      var uptime_b = b.uptime_truncated || b.uptime || -1;
      if (uptime_b !== uptime_a) return uptime_b - uptime_a;
      return b.public_key > a.public_key ? 1 : -1;
    });
    return peers;
  },

  mergeOldAndNew: function(newPeers, oldPeers) {
    var oldPeersByPubKey = {};
    _.each(oldPeers, function(item) {
      oldPeersByPubKey[item.new.public_key] = item.new;
    });
    var ret = _.map(newPeers, function(p) {
      return { new: p, old: oldPeersByPubKey[p.public_key]};
    });
    return ret;
  },

  animateChange: function(propertyArray) {
    function animate($element, oldValue, newValue) {
      var originalColor = $element.css('color');
      var toColor = newValue > oldValue ? '#00FF00' : '#FF0000';
      $element.animate({'opacity': 0}, 0, function() {
        $element.html(newValue);
        $element.animate({'color': toColor, 'opacity': 1}, 200, function() {
          $element.animate({'color': originalColor}, 600);
        });
      });
    }

    _.each(propertyArray, function(prop) {
      var tds = $('td.' + prop);
      tds.each(function(index, td) {
        var $td = $(td);
        var nv = $td.attr('data-new');
        var ov = $td.attr('data-old');
        if (nv !== ov) {
          animate($td, ov, nv);
        } else {
          $td.html(nv);
        }
      });
    });
  }
}
