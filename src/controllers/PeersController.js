var app   = require('../app');
var Peers = require('../services/Peers');

app.controller('PeersCtrl', ['$scope', function ($scope) {

  $scope.loading = true;
  $scope.status = 'Loading Peers...';

  function fetchAndShow() {
    Peers.fetch().then(function(peers) {
      $scope.loading = false;
      peers = Peers.formatUptimes(peers);
      peers = Peers.sortByUptime(peers);
      var sp = Peers.mergeOldAndNew(peers, $scope.peers);
      $scope.peers = sp;
      $scope.$apply();
      Peers.animateChange(['inbound_connections', 'outbound_connections', 'uptime_formatted']);
    });
    process.nextTick(function() {
      setTimeout(fetchAndShow, 2000);
    });
  }

  fetchAndShow();
}]);
