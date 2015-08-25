var app   = require('../app')
var Peers = require('../services/Peers')

app.controller('PeersCtrl', ['$scope', function ($scope) {

  $scope.loading = true
  $scope.status = "Loading Peers..."

  Peers.fetch().then(function(peers) {
    $scope.loading = false
    $scope.peers = peers
    $scope.$apply()
  })
}])

