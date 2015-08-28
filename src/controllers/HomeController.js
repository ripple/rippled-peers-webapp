var app   = require('../app')
var Peers = require('../services/Peers')
var Graph = require('../services/Graph')

app.controller('HomeCtrl', ['$scope', function ($scope) {

  $scope.loadingPeers = true
  $scope.loadingGraph = true
  $scope.statusPeers = "Loading Peers..."
  $scope.statusGraph = "Loading Graph..."

  Peers.fetch().then(function(peers) {
    $scope.peers = Peers.sortByUptime(peers)
    $scope.loadingGraph = false
    $scope.$apply()
  })

  Graph.fetch().then(function(graph) {
    Graph.produce(graph, ".graph", 400, 540, 290, -200, 100, 0.4)
    $scope.loadingPeers = false
    $scope.$apply()
  })
}])
