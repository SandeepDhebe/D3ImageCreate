import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as d3_save_pdf from 'd3-save-pdf';
import jsPDF from 'jspdf';


const data = [
                {item: 'A', count: 590},
                {item: 'B', count: 291},
                {item: 'C', count: 348},
                {item: 'D', count: 145},
                {item: 'E', count: 46}
             ]


const Pie = () => {

	const pieChart = useRef()

	useEffect(()=>{

		// set the dimensions aand margins of the graph
const margin = {top: 30, right: 30, bottom: 30, left: 50};
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
.append("svg")
.attr("xmlns", "http://www.w3.org/2000/svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


// get the data
d3.
      csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv").then((data) => {

// add the x Axis
const x = d3.scaleLinear()
  .domain([-10,15])
  .range([0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// add the y Axis
const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 0.12]);
svg.append("g")
  .call(d3.axisLeft(y));

// Compute kernel density estimation
const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60))
const density1 =  kde( data
  .filter( function(d){return d.type === "variable 1"} )
  .map(function(d){  return d.value; }) )
const density2 =  kde( data
  .filter( function(d){return d.type === "variable 2"} )
  .map(function(d){  return d.value; }) )

// Plot the area
svg.append("path")
  .attr("class", "mypath")
  .datum(density1)
  .attr("fill", "#69b3a2")
  .attr("opacity", ".6")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("stroke-linejoin", "round")
  .attr("d",  d3.line()
    .curve(d3.curveBasis)
      .x(function(d) { return x(d[0]); })
      .y(function(d) { return y(d[1]); })
  );

// Plot the area
svg.append("path")
  .attr("class", "mypath")
  .datum(density2)
  .attr("fill", "#404080")
  .attr("opacity", "0.6")
  .attr("stroke", "#000")
  .attr("stroke-width", 1)
  .attr("stroke-linejoin", "round")
  .attr("d",  d3.line()
    .curve(d3.curveBasis)
      .x(function(d) { return x(d[0]); })
      .y(function(d) { return y(d[1]); })
  );
//   var config = {
//     filename: 'customFileName',
//   }
// //   console.log('image', d3_save_pdf.save(d3.select('svg').node(), config));

//   let canvas = document.createElement('canvas');
//   console.log('d3.select', d3.select('svg').node());
//       canvas.width = 460;
//       canvas.height = 400;
//       let ctx = canvas.getContext("2d");
//       let doc = new jsPDF({orientation: 'l', unit: 'px'});
//       var svg1 = '<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>'
//     // SVG Containing version and xmlns attributes as Terje stated
//     // const my_svg = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`; 
//     const img = document.createElement('img');

//     // img.onload = function () {
//     //   console.log('Image Loaded')
//     // }

//     // img.src = 'data:image/svg+xml;base64,'+ btoa(svg1);;    
//       img.onload = () => {
//         ctx.drawImage(img, 0, 0);
//         // console.log(canvas.toDataURL("image/png"));
//         doc.setFontSize(11);
//         doc.text(5, 10, 'D3 Chart');
//         doc.addImage(canvas.toDataURL("image/png"), 'PNG', 10, 10);
//         doc.save('download.pdf');
//       };
//       img.onerror = (e) => {
//         console.log('error', e);
//       }
//       img.src = 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(d3.select('svg').node()))));
    });

// Handmade legend
svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#404080")
svg.append("text").attr("x", 320).attr("y", 30).text("constiable A").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 320).attr("y", 60).text("constiable B").style("font-size", "15px").attr("alignment-baseline","middle")

// Function to compute density
function kernelDensityEstimator(kernel, X) {
return function(V) {
return X.map(function(x) {
  return [x, d3.mean(V, function(v) { return kernel(x - v); })];
});
};
}
function kernelEpanechnikov(k) {
return function(v) {
return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
};

}

	})

    
const handleOnClick = ()=>{
    var config = {
        filename: 'customFileName',
      }
    //   console.log('image', d3_save_pdf.save(d3.select('svg').node(), config));
    
      let canvas = document.createElement('canvas');
    //   console.log('d3.select', d3.select('svg').node());
          canvas.width = 460;
          canvas.height = 400;
          let ctx = canvas.getContext("2d");
          let doc = new jsPDF({orientation: 'l', unit: 'px'});
        //   var svg1 = '<svg xmlns="http://www.w3.org/2000/svg" height="100" width="100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" /></svg>'
        // SVG Containing version and xmlns attributes as Terje stated
        // const my_svg = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`; 
        const img = document.createElement('img');
    
        // img.onload = function () {
        //   console.log('Image Loaded')
        // }
    
        // img.src = 'data:image/svg+xml;base64,'+ btoa(svg1);;    
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
            // console.log(canvas.toDataURL("image/png"));
            doc.setFontSize(11);
            doc.text(5, 10, 'D3 Chart');
            doc.addImage(canvas.toDataURL("image/png"), 'PNG', 10, 10);
            doc.save('download.pdf');
          };
          img.onerror = (e) => {
            console.log('error', e);
          }
          img.src = 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(d3.select('svg').node()))));
    
}

	return (
        <>
		<div id="my_dataviz"></div>
        <button onClick={handleOnClick} >Generate PDF</button>
        </>
	)
}

export default Pie;