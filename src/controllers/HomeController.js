var app   = require('../app')
var Peers = require('../services/Peers')
var Graph = require('../services/Graph')

app.controller('HomeCtrl', ['$scope', function ($scope) {

  $scope.loadingPeers = true
  $scope.loadingGraph = true
  $scope.statusPeers = "Loading Peers..."
  $scope.statusGraph = "Loading Graph..."

  function fetchAndShow() {
    Peers.fetch().then(function(peers) {
      $scope.loadingPeers = false
      peers = Peers.formatUptimes(peers);
      peers = Peers.sortByUptime(peers);
      var sp = Peers.mergeOldAndNew(peers, $scope.peers);
      $scope.peers = sp;
      $scope.$apply();
      Peers.animateChange(['inbound_connections', 'outbound_connections', 'uptime_formatted']);
    });
    process.nextTick(function() {
      setTimeout(fetchAndShow, 2000)
    });
  }

  fetchAndShow()

  Graph.fetch().then(function(graph) {
    Graph.produce(graph, ".graph", 400, 540, 290, -200, 100, 0.4)
    $scope.loadingGraph = false
    $scope.$apply()
  })
}])
