import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { zoom } from 'd3-zoom';

const ScatterPlot = ({ data, width, height, color, xLabel, yLabel }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createScatterPlot = () => {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x) + margin.left)
        .attr('cy', d => yScale(d.y) + margin.top)
        .attr('r', 4)
        .attr('fill', color);

      if (xLabel) {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('x', width / 2)
          .attr('y', height - 10)
          .attr('text-anchor', 'middle')
          .text(xLabel);
      }

      if (yLabel) {
        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('x', -height / 2)
          .attr('y', 15)
          .attr('text-anchor', 'middle')
          .attr('transform', 'rotate(-90)')
          .text(yLabel);
      }

      // Enable zooming and panning
      const zoomBehavior = zoom().on('zoom', handleZoom);
      svg.call(zoomBehavior);

      function handleZoom(event) {
        const { transform } = event;
        svg.attr('transform', transform);
      }
    };

    createScatterPlot();
  }, [data, width, height, color, xLabel, yLabel]);

  return <svg ref={svgRef} />;
};

export default ScatterPlot;