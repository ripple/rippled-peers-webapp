var app   = require('../app')
var Graph = require('../services/Graph')

app.controller('GraphCtrl', ['$scope', function ($scope) {

  $scope.loading = true
  $scope.status = "Loading Graph..."

  Graph.fetch().then(function(graph) {
    $scope.loading = false
    $scope.graph = graph
    $scope.$apply()

    function versionToColor(version) {
      var green = "#4890CE"
      var yellow = "#FDB34D"
      var red = "#C0464B"
      var color = '#000000';

      if (version) {
        var v_arr = version.split("-");
        var v_str = v_arr[1];
        var split = v_str.split('.');
        var v_num = parseInt(split[0] + split[1] + split[2]);

        if (v_num < 290)
          color = red;
        else
          color = green;
      }

      return color
    }

    var width = 1200,
        height = 800;

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(-400)
        .linkDistance(280)
        .size([width, height]);

    var svg = d3.select(".graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        //.style("stroke-width", function(d) { return Math.sqrt(1); });

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", function(d) { return parseInt(d.in) + parseInt(d.out) ? Math.sqrt(parseInt(d.in) + parseInt(d.out)) + 2 : 2; })
        .style("fill", function(d) { return versionToColor(d.version); })
        .call(force.drag);

    node.append("title")
        .text(function(d) { return d.public_key; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });

  })
}])
