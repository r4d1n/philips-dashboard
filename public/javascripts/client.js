'use strict'

$(document).ready(function() {
  console.log(dummyData);
})


function getTemps (arr) {
  var temps = [];
  for(var i = 0; i < arr.length; i++) {
      var point = arr[i].Temperature.value;
      temps.push(point);
    }
  return temps;
};

// charts with D3

var data = getTemps(dummyData);
var w = 400,
h = 200,
margin = 20,
y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]),
x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin])

var vis = d3.selectAll(".chart")
.append("svg:svg")
.attr("width", w)
.attr("height", h)

var g = vis.append("svg:g")
.attr("transform", "translate(0, 200)");

var line = d3.svg.line()
.x(function(d,i) { return x(i); })
.y(function(d) { return -1 * y(d); })

g.append("svg:path").attr("d", line(data));

g.append("svg:line")
.attr("x1", x(0))
.attr("y1", -1 * y(0))
.attr("x2", x(w))
.attr("y2", -1 * y(0))

g.append("svg:line")
.attr("x1", x(0))
.attr("y1", -1 * y(0))
.attr("x2", x(0))
.attr("y2", -1 * y(d3.max(data)))
