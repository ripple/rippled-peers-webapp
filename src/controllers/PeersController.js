var app   = require('../app')
var Peers = require('../services/Peers')

app.controller('PeersCtrl', ['$scope', function ($scope) {

  $scope.loading = true
  $scope.status = "Loading Peers..."

  Peers.fetch().then(function(peers) {
    // Sort peers by uptime
    peers.sort(function(a, b){
      var uptime_a = a.uptime ? a.uptime : -1;
      var uptime_b = b.uptime ? b.uptime : -1;
      if(uptime_a < uptime_b) return 1;
      if(uptime_a > uptime_b) return -1;
      return 0;
    });

    $scope.loading = false
    $scope.peers = peers
    $scope.$apply()
  })
}])
