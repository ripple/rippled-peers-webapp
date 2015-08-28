var app   = require('../app');
var Peers = require('../services/Peers');

app.controller('PeersCtrl', ['$scope', function ($scope) {

  $scope.loading = true;
  $scope.status = 'Loading Peers...';

  function fetchAndShow() {
    Peers.fetch().then(function(peers) {
      $scope.loading = false;
      $scope.peers = Peers.sortByUptime(peers);
      $scope.$apply();
    });
    process.nextTick(function() {
      setTimeout(fetchAndShow, 2000);
    });
  }

  fetchAndShow();
}]);
