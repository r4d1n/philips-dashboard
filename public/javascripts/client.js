'use strict'

$(document).ready(function() {
  console.log(dummyData);

  function getTemps (arr) {
    var temps = [];
    for(var i = 0; i < arr.length; i++) {
      var point = arr[i].Temperature.value;
      temps.push(point);
    }
    return temps;
  };

  // Create a d3 parser for this particular date format, this may not be relevant
  // if you already have actual dates
  (function parseForCharts () {
    var data = dummyData;
    var inFormat = d3.time.format("%Y-%m-%d %H:%M");

    // Create a d3 parser for the day and time formats we are going to use
    var dayFormat = d3.time.format("%d %b"),
    timeFormat = d3.time.format("%H:%M");

    // Add some code to manipulate the date into 2 separate fields
    // because this is a category axis you need to handle formatting here
    // category axes use text content
    data.forEach(function (d) {
      // Convert the date to an actual date, you may not need to do this if
      // you already have date objects in your data
      var inDate = inFormat.parse(d.time);
      // Add a new field for the time portion
      d["Day"] = dayFormat(inDate);
      d["Time"] = timeFormat(inDate);
      d["Therapy"] = d.therapy;
    }, this);
  })();

  // chart
  // var o2 = $.ajax({
  //   url:"/data/o2",
  //   async: false
  //
  // }).responseText;
  // console.log(o2data);

  // var temp = $.ajax({
  //   url:"/data/temp",
  //   async: false
  //
  // }).responseText;

  (function firstChart () {
    var data = dummyData;
    var svg = dimple.newSvg("#chart1", 800, 250);
    var chart = new dimple.chart(svg, data);
    var xAxis = chart.addCategoryAxis("x", ["Day","Time"]);
    var yTemperatureAxis = chart.addMeasureAxis("y", "temperature");
    var o2Axis = chart.addMeasureAxis("y", "o2");
    // yTemperatureAxis.tickFormat = ',.1f';
    yTemperatureAxis.overrideMin = 95;
    o2Axis.overrideMin = 75;
    var temperatureSeries = chart.addSeries("Temperature", dimple.plot.line, [xAxis, yTemperatureAxis]);
    var o2Series = chart.addSeries("O2", dimple.plot.line, [xAxis, o2Axis]);
    temperatureSeries.lineMarkers = true;
    o2Series.lineMarkers = true;
    yTemperatureAxis.title = "Temperature F";
    o2Axis.title = "O2";

    xAxis.title = "Time";
    chart.addLegend(60,5,120,10,"right",temperatureSeries);
    chart.addLegend(120,5,120,10,"right",o2Series);

    chart.draw();
  })();

  (function secondChart () {
    var data = [];
    for(var i = 0; i < dummyData.length; ++i) {
      if(dummyData[i].wbc) {
        data.push(dummyData[i]);
      }
    }
    var svg = dimple.newSvg("#chart2", 800, 250);
    var chart = new dimple.chart(svg, data);
    var xAxis = chart.addCategoryAxis("x", ["Day","Time"]);
    var yWbcAxis = chart.addMeasureAxis("y", "wbc");
    // yTemperatureAxis.tickFormat = ',.1f';
    var wbcSeries = chart.addSeries("WBC", dimple.plot.line, [xAxis, yWbcAxis]);
    wbcSeries.lineMarkers = true;
    wbcSeries.tickFormat = ',.01f';
    yWbcAxis.overrideMin = 9;
    yWbcAxis.overrideMax = 14;
    yWbcAxis.title = "WBC Count";
    xAxis.title = "Time";
    chart.addLegend(60,5,120,10,"right",wbcSeries);

    chart.draw();
  })();

  (function timeline () {
    var data = [];
    for(var i = 0; i < dummyData.length; ++i) {
      if(dummyData[i].therapy) {
        dummyData[i].therapyValue = 0.5;
        data.push(dummyData[i]);
      }
    }
    var svg = dimple.newSvg("#timeline", 700, 75);
    var chart = new dimple.chart(svg, data);
    var xAxis = chart.addCategoryAxis("x", ["Therapy", "Day","Time"]);
    xAxis.addOrderRule("Day");
    var eventAxis = chart.addMeasureAxis("y", "therapyValue");
    var eventSeries = chart.addSeries(null, dimple.plot.line, [xAxis, eventAxis]);
    eventSeries.lineMarkers = true;
    eventAxis.hidden = true;
    xAxis.hidden = true;
    xAxis.title = "Time";
    chart.setBounds(60, 25, 700, 50);
    // chart.assignColor('therapyValue', '#333', '#999', 1)
    chart.draw();
  })();

}) // document ready

// $('#imgModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget); // Button that triggered the modal
//   var modal = $(this);
//   // Extract info from data-* attributes
//   var title = button.data('title');
//   var id = button.data('id');
//   // Write into modal
//   modal.find('.modal-title').text('Delete ' + title);
//   modal.find('.modal-body').text('Are you sure you want to remove ' + title + ' from the library?');
//   // Delete a book
//   $('.delete-button').click(function() {
//     $.post('/books/' + id + '/delete/', function(res) {
//       window.location.reload();
//     })
//     return false;
//   }); // end delete button
// }); // end delete modal
