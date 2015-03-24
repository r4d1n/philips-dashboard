$(document).ready(function() {

  var seriesData1 = [ [], [], [], [], []];
  var seriesData2 = [ [], [], []];
  var seriesData3 = [ [], [], [], []];
  var random = new Rickshaw.Fixtures.RandomData(50);
  for (var i = 0; i < 10; i++) {
    random.addData(seriesData1);
  }
  for (var i = 0; i < 10; i++) {
    random.addData(seriesData2);
  }
  for (var i = 0; i < 10; i++) {
    random.addData(seriesData3);
  }
  var vitalsGraph = new Rickshaw.Graph( {
    element: document.getElementById("chart1"),
    renderer: 'multi',
    width: 750,
    height: 150,
    dotSize: 5,
    min: -10,
    max: 110,
    stack: false,
    series: [
  {
    name: 'Temperature',
    data: tempData,
    color: 'rgba(255, 119, 170, 0.4)',
    renderer: 'scatterplot' },
  // }, {
  //   name: 'Respiratory',
  //   data: seriesData1.shift(),
  //   color: 'rgba(255, 127, 0, 0.4)',
  //   renderer: 'line'
  // }, {
  //   name: 'Heartbeat',
  //   data: seriesData1.shift(),
  //   color: 'rgba(127, 0, 0, 0.3)',
  //   renderer: 'line'
  // }, {
  //   name: 'Blood Pressure',
  //   data: seriesData1.shift().map(function(d) { return { x: d.x, y: d.y / 4 } }),
  //   color: 'rgba(0, 0, 127, 0.4)',
  //   renderer: 'line'
  {
    name: 'O2',
    data: o2Data,
    renderer: 'scatterplot',
    color: 'rgba(170, 255, 119, 1.0)'
  },
  ]
} );

var cbcGraph = new Rickshaw.Graph( {
  element: document.getElementById("chart2"),
  renderer: 'multi',
  width: 750,
  height: 150,
  dotSize: 5,
  min: 8,
  max: 16,
  stack: false,
  series: [
// {
//   name: 'RBC',
//   data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
//   renderer: 'scatterplot',
//   color: 'rgba(162, 0, 255, 0.5)'
// }, {
  {
    name: 'WBC',
    data: wbcData,
    renderer: 'scatterplot',
    color: 'rgba(27, 161, 266, 0.5)'
  }
// }, {
//   name: 'PLT',
//   data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
//   renderer: 'scatterplot',
//   color: 'rgba(240, 150, 9, 0.5)'
// }
]
});

var bmpGraph = new Rickshaw.Graph( {
  element: document.getElementById("chart3"),
  renderer: 'multi',
  width: 750,
  height: 250,
  dotSize: 5,
  min: 'auto',
  stack: false,
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
  element: document.querySelector('#slider'),
  
});


// vitalsGraph stuffs
var detail1 = new Rickshaw.Graph.HoverDetail({
  graph: vitalsGraph,

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

// dummy data

var tempData = [{ x:1426898100, y: 101.4} ,
{ x:1426901700, y: 101.5} ,
{ x:1426912200, y: 101.3} ,
{ x:1426933800, y: 102} ,
{ x:1426947000, y: 101.1} ,
{ x:1426962600, y: 100.9} ,
{ x:1426976700, y: 100.4} ,
{ x:1426990200, y: 100.6} ,
{ x:1427011200, y: 102.1} ,
{ x:1427025600, y: 102.2} ,
{ x:1427038200, y: 102.4} ,
{ x:1427051700, y: 102.4} ,
{ x:1427067900, y: 102.1} ,
{ x:1427082300, y: 102.3} ,
{ x:1427098200, y: 101.8} ,
{ x:1427112600, y: 101.1} ,
{ x:1427126400, y: 100.9} ,
{ x:1427157300, y: 100.7} ,
{ x:1427172000, y: 100.3} ,
{ x:1427190600, y: 100.1} ,
{ x:1427202900, y: 99.1} ,
{ x:1427222700, y: 98.7} ,
]

var o2Data = [{ x:1426898100, y: 0.92} ,
{ x:1426901700, y: 0.93} ,
{ x:1426912200, y: 0.95} ,
{ x:1426933800, y: 0.92} ,
{ x:1426947000, y: 0.94} ,
{ x:1426962600, y: 0.97} ,
{ x:1426976700, y: 0.97} ,
{ x:1426990200, y: 0.98} ,
{ x:1427011200, y: 0.93} ,
{ x:1427025600, y: 0.91} ,
{ x:1427038200, y: 0.9} ,
{ x:1427051700, y: 0.9} ,
{ x:1427067900, y: 0.89} ,
{ x:1427082300, y: 0.92} ,
{ x:1427098200, y: 0.94} ,
{ x:1427112600, y: 0.96} ,
{ x:1427126400, y: 0.97} ,
{ x:1427157300, y: 0.99} ,
{ x:1427172000, y: 0.99} ,
{ x:1427190600, y: 0.99} ,
{ x:1427202900, y: 0.99} ,
{ x:1427222700, y: 0.99} ,
]

var wbcData = [
{ x:1426904700, y: 13.1} ,
{ x:1426947000, y: 13.5} ,
{ x:1427031000, y: 14.5} ,
{ x:1427112000, y: 12.1} ,
{ x:1427202900, y: 10.1} ,
 ]