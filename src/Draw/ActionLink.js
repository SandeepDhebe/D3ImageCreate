import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import jsPDF, { AcroFormTextField } from 'jspdf';
import './ActionLink.css';

const ActionLink = ({props}) => {

  console.log('props->', props);
  const loaded = useRef();
  loaded.current = true;
  useEffect( () => {
  if(loaded.current){
  loaded.current = false;
  var svg = d3.select("#my_rect").append("svg").attr("width", props.width + 200).attr("height", props.height + 200)

	
// const data = [[[20,30],[40,50]], [[50,100],[80,150]], [[200,30],[400,100]]];
var color = d3.scaleSequential()
  .domain([0, 2 * Math.PI])
  .interpolator(d3.interpolateRainbow);

var data1 = d3.range(10).map(d=> ({color:d3.interpolateSpectral(d/10), value:d}))
var extent = d3.extent(data1, d => d.value);

const colors = [ 'rgb(255,0,0)', 'rgb(255,255,0)' ];

var defs = svg.append("defs");
var linearGradient = defs.append("linearGradient").attr("id", "myGradient");
linearGradient.selectAll("stop")
.data(data1)
.enter().append("stop")
.attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
.attr("stop-color", d => d.color);

// const rects = svg.selectAll("foo")
// 	.data(data)
// 	.enter()
// 	.append("rect")
// 	.attr("x", 20)
// 	.attr("y", 30)
// 	.attr("width", 200)
// 	.attr("height", 200)
// 	.attr("fill", "url(#myGradient)");

svg.append('rect')
  .attr('x', 10)
  .attr('y', 120)
  .attr('width', props.width)
  .attr('height', props.height)
  .attr('stroke', 'black')
  .attr('fill', 'url(#myGradient)');
}
});

  function generatePDF() {
    var config = {
      filename: 'customFileName',
    };
    //   console.log('image', d3_save_pdf.save(d3.select('svg').node(), config));
    let canvas = document.createElement('canvas');
    //   console.log('d3.select', d3.select('svg').node());
    canvas.width = props.width + 200;
    canvas.height = props.height + 200;
    let ctx = canvas.getContext("2d");
    let doc = new jsPDF({ orientation: 'l', unit: 'px' });
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
      doc.text(5, 10, 'Demo chart');
      // var textField = new AcroFormTextField();
      // textField.Rect = [300, 100, 300, 300];
      // textField.multiline = true;
      // textField.V = "The quick brown fox ate the lazy mouse The quick brown fox ate the lazy mouse The quick brown fox ate the lazy mouse";
      // textField.T = "TestTextBox";
      // doc.addField(textField);
      doc.text(300,100,'Width: '+ props.width)
      doc.text(300,110,'Height: '+ props.height)
      doc.addImage(canvas.toDataURL("image/png"), 'PNG', 10, 10);
      doc.save('download.pdf');
    };
    img.onerror = (e) => {
      console.log('error', e);
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(d3.select('svg').node()))));

  }

  return(
    <>
      <div>
        <div id="my_rect"></div>
        <div id="generateButton"className='center'>
          <button  onClick={generatePDF} >Generate PDF</button>
        </div>
      </div>
    </>
  )
}

export default ActionLink;