import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, width, height, lineColor, xLabel, yLabel }) => {
  const svgRef = useRef(null);
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    const createLineChart = () => {
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

      const line = d3.line()
        .x((d, i) => xScale(i) + margin.left)
        .y((d) => yScale(d) + margin.top);

      const path = svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('stroke-width', 2)
        .attr('d', line);

      const totalLength = path.node().getTotalLength();

      path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1500)
        .attr('stroke-dashoffset', 0);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

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

      const handleMouseEnter = (event, d) => {
        setHoveredValue(d);
      };

      const handleMouseLeave = () => {
        setHoveredValue(null);
      };

      svg.selectAll('.data-point')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', (d, i) => xScale(i) + margin.left)
        .attr('cy', (d) => yScale(d) + margin.top)
        .attr('r', 4)
        .attr('fill', lineColor)
        .on('mouseenter', handleMouseEnter)
        .on('mouseleave', handleMouseLeave);
    };

    createLineChart();
  }, [data, width, height, lineColor, xLabel, yLabel]);

  return (
    <div>
      <svg ref={svgRef} />
      {hoveredValue !== null && (
        <div className="tooltip">
          <h2>{hoveredValue}</h2>
        </div>
      )}
    </div>
  );
};

export default LineChart;