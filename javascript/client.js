$(document).ready(function() {

var seriesData1 = [ [], [], [], [], []];
var seriesData2 = [ [], [], []];
var random = new Rickshaw.Fixtures.RandomData(50);
for (var i = 0; i < 75; i++) {
	random.addData(seriesData1);
}
for (var i = 0; i < 75; i++) {
	random.addData(seriesData2);
}
var graph1 = new Rickshaw.Graph( {
	element: document.getElementById("chart1"),
	renderer: 'multi',
	width: 750,
	height: 250,
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


var graph2 = new Rickshaw.Graph( {
	element: document.getElementById("chart2"),
	renderer: 'multi',
	width: 750,
	height: 250,
	dotSize: 5,
	series: [
		{
			name: 'CBC',
			data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
			renderer: 'line',
			color: 'rgba(0, 0, 127, 0.25)'
		}, {
			name: 'BMP',
			data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
			renderer: 'line',
			color: 'rgba(0, 0, 127, 0.25)'
		}, {
			name: 'Blood Culture',
			data: seriesData2.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 } }),
			renderer: 'line',
			color: 'rgba(0, 0, 127, 0.25)'
		}
	]
} );


var slider = new Rickshaw.Graph.RangeSlider.Preview({
	graphs: [graph1, graph2],
	element: document.querySelector('#slider')
});
// var slider = new Rickshaw.Graph.RangeSlider.Preview({
// 	graph: graph2,
// 	element: document.querySelector('#slider')
// });
graph1.render();
graph2.render();

// graph 1 stuffs
var detail1 = new Rickshaw.Graph.HoverDetail({
	graph: graph1
});
var legend = new Rickshaw.Graph.Legend({
	graph: graph1,
	element: document.querySelector('#legend')
});
var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
    graph: graph1,
    legend: legend,
    disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});

var highlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
    graph: graph2,
    legend: legend
});

//graph 2 stuff
var detail2 = new Rickshaw.Graph.HoverDetail({
	graph: graph2
});
var legend = new Rickshaw.Graph.Legend({
	graph: graph2,
	element: document.querySelector('#legend')
});
var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
    graph: graph2,
    legend: legend,
    disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var highlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
    graph: graph2,
    legend: legend
});





});
