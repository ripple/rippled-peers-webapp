var app   = require('../app')
var Graph = require('../services/Graph')

app.controller('GraphCtrl', ['$scope', function ($scope) {

  $scope.loading = true
  $scope.status = "Loading Graph..."

  Graph.fetch().then(function(graph) {
    Graph.produce(graph, ".graph", 800, 1200, -250, 300, 0.5)
    $scope.loading = false
    $scope.$apply()
  })
}])
