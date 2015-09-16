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
  },

  produce: function(graph, element, height, width, latest_version, charge, link_distance, growth_factor) {

    function versionToColor(version) {
      var green = "#4890CE"
      var yellow = "#FDB34D"
      var red = "#C0464B"
      var color = '#FFFFFF';

      if (version) {
        var v_arr = version.split("-");
        var v_str = v_arr[1];
        var split = v_str.split('.');
        var v_num = parseInt(split[0] + split[1] + split[2]);

        if (v_num < latest_version)
          color = red;
        else
          color = green;
      }

      return color
    }

    var color = d3.scale.category20();

    var force = d3.layout.force()
        .charge(charge)
        .linkDistance(link_distance)
        .size([width, height]);

    var svg = d3.select(element).append("svg").style("float", "right")
        .attr("width", width)
        .attr("height", height)

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", function(d) { return parseInt(d.in) + parseInt(d.out) ? Math.pow(parseInt(d.in) + parseInt(d.out), growth_factor) + 1 : 1;})
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
  }
}
