/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/
var width = 600,
  height = 600;
  bounce = 25

var canvas = d3.select("#chart-area")
  .append("svg")
    .attr("width", width)
    .attr("height", height)

d3.json('data/companions.json').then(function(data){

  var simulation = d3.forceSimulation()
    .force('x', d3.forceX(width / 2).strength(0.2))
    .force('y', d3.forceY(height / 2).strength(0.2))
    .force('collide', d3.forceCollide(function(d){
      return d.companions.length * 3 +20
    }))

  var circles = canvas.selectAll('.plant')
    .data(data)
    .enter().append("circle")
    .attr("fill", "blue")
    .attr('r', function(d){
      return d.companions.length * 3
    })

    simulation.nodes(data)
      .on('tick', ticked)

    function ticked(){
      bounce*-1
      circles
        .attr('cx', function(d){
          // console.log(d.x)
          return d.x
        })
        .attr('cy', function(d){
          return d.y
        })
    }


});

// // Add margins that will be suitable for the axes to display
// var margin = { left: 100, right: 20, top: 50, bottom: 100};
// var width = 600 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// var flag = true;
// var t = d3.transition().duration(750)
//
// // Create the area/canvas where the chart will display
// var canvas = d3.select("#chart-area")
//   .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.right)
//   .append('g')
//     .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
//
// //X Scale
// var x = d3.scaleBand()
//     .range([0, width])
//     .padding(0.2);
//
// //Y Scale
// var y = d3.scaleLinear()
//   .range([height, 0]);
//
// // Call the axes to create them
// var xAxisGroup = canvas.append('g')
//   .attr("class", "x-axis")
//   .attr('transform', "translate(0, " + height + ")")
//
//
// var yAxisGroup = canvas.append('g')
//   .attr("class", "y-axis")
//
//
// canvas.append('text')
//   .attr('y', height + 50)
//   .attr('x', width / 2)
//   .attr("font-size", "20px")
//   .attr("text-anchor", "middle")
//   .text("Month");
//
//
// yLabel = canvas.append("text")
//     .attr("y", -60)
//     .attr("x", -(height / 2))
//     .attr("font-size", "20px")
//     .attr("text-anchor", "middle")
//     .attr("transform", "rotate(-90)")
//     .text("Revenue");
//
//
// // Load the data and make sure data is in integer format
// d3.json('data/revenues.json').then(function(data){
//   data.forEach(function(d){
//     d.revenue = +d.revenue;
//     d.profit = +d.profit;
//   });
//
//     d3.interval(function(){
//       var newData = flag ? data : data.slice(1)
//       update(newData)
//       flag = !flag
//     }, 500)
//
//   update(data)
//
// });
//
// function update(data) {
//   var value = flag ? "revenue" : "profit";
//
//   x.domain(data.map(function(d){ return d.month }))
//   y.domain([0, d3.max(data, function(d){ return d[value] })])
//
//   var xAxisCall = d3.axisBottom(x);
//   xAxisGroup.transition(t).call(xAxisCall)
//
//   var yAxisCall = d3.axisLeft(y)
//       .tickFormat(function(d){ return "$" + d; });
//     yAxisGroup.transition(t).call(yAxisCall);
//
//   // JOIN new data with old elements
//   var rects = canvas.selectAll("circle")
//   .data(data, function(d){
//     return d.month;
//   })
//
// //EXIT old elements not present in new Data
//   rects.exit()
//       .attr("fill", "red")
//   .transition(t)
//       .attr('cy',  y(0))
//   .remove();
//
// //ENTER new elements present in new data
//   rects.enter()
//     .append("circle")
//       .attr("fill", "grey")
//       .attr("cy", y(0))
//       .attr("cx", function(d){ return x(d.month) + x.bandwidth() / 2 })
//       .attr("r", 1)
//     //UPDATE
//     .merge(rects)
//     .transition(t)
//       .attr("cx", function(d){ return x(d.month) + x.bandwidth() / 2 })
//       .attr("cy", function(d){ return y(d[value]); })
//       .attr("r", 10)
//
//
//   var label = flag ? "Revenue" : "Profit";
//   yLabel.text(label);
// }
