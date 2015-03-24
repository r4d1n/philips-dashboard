$(document).ready(function() {

  var seriesData1 = [ [], [], [], [], []];
  var seriesData2 = [ [], [], []];
  var seriesData3 = [ [], [], [], []];
  var random = new Rickshaw.Fixtures.RandomData(50);
  for (var i = 0; i < 75; i++) {
    random.addData(seriesData1);
  }
  for (var i = 0; i < 75; i++) {
    random.addData(seriesData2);
  }
  for (var i = 0; i < 75; i++) {
    random.addData(seriesData3);
  }
  var vitalsGraph = new Rickshaw.Graph( {
    element: document.getElementById("chart1"),
    renderer: 'multi',
    width: 750,
    height: 150,
    dotSize: 5,
    series: [
  {
    name: 'Temperature',
    data: seriesData1.shift(),
    color: 'rgba(255, 0, 0, 0.4)',
    renderer: 'line'
  }, {
    name: 'Respiratory',
    data: seriesData1.shift(),
    color: 'rgba(255, 127, 0, 0.4)',
    renderer: 'line'
  }, {
    name: 'Heartbeat',
    data: seriesData1.shift(),
    color: 'rgba(127, 0, 0, 0.3)',
    renderer: 'line'
  }, {
    name: 'Blood Pressure',
    data: seriesData1.shift().map(function(d) { return { x: d.x, y: d.y / 4 } }),
    color: 'rgba(0, 0, 127, 0.4)',
    renderer: 'line'
  }, {
    name: 'O2',
    data: seriesData1.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
    renderer: 'line',
    color: 'rgba(204, 0, 51, 1.0)'
  }
  ]
} );

var cbcGraph = new Rickshaw.Graph( {
  element: document.getElementById("chart2"),
  renderer: 'multi',
  width: 750,
  height: 200,
  dotSize: 5,
  series: [
{
  name: 'RBC',
  data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'scatterplot',
  color: 'rgba(162, 0, 255, 0.5)'
}, {
  name: 'WBC',
  data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'scatterplot',
  color: 'rgba(27, 161, 266, 0.5)'
}, {
  name: 'PLT',
  data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'scatterplot',
  color: 'rgba(240, 150, 9, 0.5)'
}
]
});

var bmpGraph = new Rickshaw.Graph( {
  element: document.getElementById("chart2"),
  renderer: 'multi',
  width: 750,
  height: 200,
  dotSize: 5,
  series: [
{
  name: 'Na',
  data: seriesData3.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'line',
  color: 'rgba(18, 133, 117, 0.5)'
}, {
  name: 'K',
  data: seriesData3.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'line',
  color: 'rgba(249, 71, 47, 0.5)'
}, {
  name: 'Cl',
  data: seriesData3.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
  renderer: 'line',
  color: 'rgba(97, 216, 105, 0.5)'
}
]
} );

// render all the charts
vitalsGraph.render();
cbcGraph.render();
bmpGraph.render();

var slider = new Rickshaw.Graph.RangeSlider.Preview({
  graphs: [vitalsGraph, cbcGraph, bmpGraph], // to control all charts together
  element: document.querySelector('#slider')
});

// vitalsGraph stuffs
var detail1 = new Rickshaw.Graph.HoverDetail({
  graph: vitalsGraph
});
var vitalsLegend = new Rickshaw.Graph.Legend({
  graph: vitalsGraph,
  element: document.querySelector('#vitals-legend')
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: vitalsGraph,
  legend: vitalsLegend,
  disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: vitalsGraph,
  legend: vitalsLegend
});

// cbcGraph stuff
var detail2 = new Rickshaw.Graph.HoverDetail({
  graph: cbcGraph
});
var cbcLegend = new Rickshaw.Graph.Legend({
  graph: cbcGraph,
  element: document.querySelector('#cbc-legend')
});
var cbcHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: cbcGraph,
  legend: cbcLegend,
  disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var cbcHighlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: cbcGraph,
  legend: cbcLegend
});

// bmpGraph stuff
var detail3 = new Rickshaw.Graph.HoverDetail({
  graph: bmpGraph
});
var bmpLegend = new Rickshaw.Graph.Legend({
  graph: bmpGraph,
  element: document.querySelector('#bmp-legend')
});
var bmpHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: bmpGraph,
  legend: bmpLegend,
  disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var bmbHighlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: bmpGraph,
  legend: bmpLegend
});

}); // document ready
