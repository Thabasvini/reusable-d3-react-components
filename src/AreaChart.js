import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AreaChart = ({ data, width, height, color, labels }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createAreaChart = () => {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear()
        .domain([0, data.length - 1])
        .range([0, innerWidth]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([innerHeight, 0]);

      const area = d3.area()
        .x((d, i) => xScale(i) + margin.left)
        .y0(innerHeight + margin.top)
        .y1((d) => yScale(d) + margin.top);

      svg.append('path')
        .datum(data)
        .attr('fill', color)
        .attr('d', area);

      if (labels) {
        svg.selectAll('.label')
          .data(data)
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', (d, i) => xScale(i) + margin.left)
          .attr('y', (d) => yScale(d) + margin.top - 10)
          .attr('text-anchor', 'middle')
          .text((d, i) => labels[i]);
      }

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);
    };

    createAreaChart();
  }, [data, width, height, color, labels]);

  return <svg ref={svgRef} />;
};

export default AreaChart;