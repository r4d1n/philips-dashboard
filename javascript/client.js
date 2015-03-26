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
  var vitalsGraphTemp = new Rickshaw.Graph( {
    element: document.getElementById("chart1"),
    renderer: 'multi',
    width: 1000,
    height: 150,
    dotSize: 5,
    min: 97,
    max: 103,
    stack: false,
    series: [
        {
          name: 'Temperature',
          data: tempData,
          color: 'rgba(255, 119, 170, 0.4)',
          renderer: 'scatterplot' },
    ]
    } );

var vitalsGraphO2 = new Rickshaw.Graph( {
  element: document.getElementById("chart1-part2"),
  renderer: 'multi',
  width: 1000,
  height: 150,
  dotSize: 5,
  min: 0.5,
  max: 1.25,
  stack: false,
  series: [
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
  width: 1000,
  height: 150,
  dotSize: 5,
  min: 10,
  max: 30,
  stack: false,
  series: [

  {
    name: 'WBC',
    data: wbcData,
    renderer: 'bar',
    color: 'rgba(27, 161, 266, 0.5)'
  }, {
    name: 'RBC',
    data: rbcData,
    renderer: 'bar',
    color: 'rgba(255, 0, 0, 0.5)'
  }, {
    name: 'PLT',
    data: pltData,
    renderer: 'bar',
    color: 'rgba(240, 150, 9, 0.5)'
  }
]
});

var bmpGraph = new Rickshaw.Graph( {
  element: document.getElementById("chart3"),
  renderer: 'multi',
  width: 750,
  height: 250,
  dotSize: 5,
  min: 0.5,
  max: 1.25,
  stack: false,
  series: [
    {
      name: 'Na',
      data: o2Data,
      renderer: 'scatterplot',
      color: 'rgba(18, 133, 117, 0.5)'
    }]
 } );



// render all the charts
vitalsGraphTemp.render();
vitalsGraphO2.render();
cbcGraph.render();
bmpGraph.render();
var slider = new Rickshaw.Graph.RangeSlider.Preview({
  graphs: [vitalsGraphTemp, vitalsGraphO2, cbcGraph, bmpGraph], // to control all charts together
  element: document.querySelector('#slider'),
  
});




// vitalsGraphTemp stuffs
var detail1 = new Rickshaw.Graph.HoverDetail({
  graph: vitalsGraphTemp,

});
var vitalsLegend = new Rickshaw.Graph.Legend({
  graph: vitalsGraphTemp,
  element: document.querySelector('#vitals-legend1')
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: vitalsGraphTemp,
  legend: vitalsLegend,
  disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: vitalsGraphTemp,
  legend: vitalsLegend,
});

// vitalsGraphO2 stuffs
var detail1 = new Rickshaw.Graph.HoverDetail({
  graph: vitalsGraphO2,

});
var vitalsLegend = new Rickshaw.Graph.Legend({
  graph: vitalsGraphO2,
  element: document.querySelector('#vitals-legend1')
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
  graph: vitalsGraphO2,
  legend: vitalsLegend,
  disabledColor: function() { return 'rgba(0, 0, 0, 0.2)' }
});
var vitalsHighlighter = new Rickshaw.Graph.Behavior.Series.Toggle({
  graph: vitalsGraphO2,
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

//bmpGraph stuff
var detail3 = new Rickshaw.Graph.HoverDetail({
  graph: bmpGraph,
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




// let's try annotator
var message_events = [
  { x:1426898100, y: 'nurse check'} ,
  { x:1426899300, y: 'physician eval'} ,
  { x:1426899900, y: 'orders entered'} ,
  { x:1426901700, y: 'vitals'} ,
  { x:1426904700, y: 'physician admit'} ,
  { x:1426910400, y: 'admitted to floor'} ,
  { x:1427031000, y: 'patient feels worse'} ,
  { x:1427141400, y: 'patient feels better'} ,
  { x:1427218200, y: 'discussion of discharge on oral antibiotics'} ,
  { x:1427227200, y: 'to home'} ,
]

var message_xray = [
  { x:1426899900, y: 'first x-ray pending'} ,
  { x:1426904700, y: 'possible pneumonia ED read'} ,
  { x:1426947000, y: 'final read pneumonia'} ,
  { x:1427031000, y: 'second x-ray pending'} ,
  { x:1427038200, y: '? Worse pneumonia'} ,
  { x:1427051700, y: 'final read same'} ,
  { x:1427112600, y: 'third x-ray pending'} ,
  { x:1427126400, y: 'slight interval improvement'} ,
  { x:1427141400, y: 'final read same'} ,
 ]

var message_therapy = [

  { x:1426912200, y: 'first dose' } ,
  { x:1426996800, y: 'second dose'} ,
  { x:1427079600, y: 'adjust antibiotics switch to IV Cetriaxone bid'} ,
  { x:1427141400, y: 'second dose'} ,
  { x:1427162400, y: 'third dose'} ,
  { x:1427207400, y: 'fourth dose'} ,
  { x:1427227200, y: 'switch to oral for 10days'} ,
 ]

var message_bc = [
{ x:1426899900, y: 'pending'} ,
{ x:1426962600, y: 'clusters cocci gram stain'} ,
{ x:1427079600, y: 'S. pneumo levaquin resistant culture sensitivity'} ,
 ]

var annotator_events = new Rickshaw.Graph.Annotate( {
  graph: vitalsGraphTemp,
  element: document.getElementById('timeline-events')
} );

var annotator_xray = new Rickshaw.Graph.Annotate( {
  graph: vitalsGraphTemp,
  element: document.getElementById('timeline-xray')
} );
var annotator_therapy = new Rickshaw.Graph.Annotate( {
  graph: vitalsGraphTemp,
  element: document.getElementById('timeline-therapy')
} );
var annotator_bc = new Rickshaw.Graph.Annotate( {
  graph: vitalsGraphTemp,
  element: document.getElementById('timeline-bc')
} );
function addAnnotation(ann, messages) {
  var index = 0;
  while (index < messages.length) {
    ann.add(messages[index].x, messages[index].y);
    ann.update();
    index ++;
  }
}
addAnnotation(annotator_events, message_events);
addAnnotation(annotator_xray, message_xray);
addAnnotation(annotator_therapy, message_therapy);
addAnnotation(annotator_bc, message_bc);

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
{ x:1427202900, y: 11.1} ,
 ]


var pltData = [
{ x:1426904700, y: 20.1} ,
{ x:1426947000, y: 21.5} ,
{ x:1427031000, y: 22.5} ,
{ x:1427112000, y: 17.1} ,
{ x:1427202900, y: 14.1} ,
 ]

var rbcData = [
{ x:1426904700, y: 18.1} ,
{ x:1426947000, y: 19.5} ,
{ x:1427031000, y: 20.5} ,
{ x:1427112000, y: 18.1} ,
{ x:1427202900, y: 13.1} ,
 ]