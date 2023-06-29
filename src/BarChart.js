import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width, height, barColor, xLabel, yLabel }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createBarChart = () => {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3.scaleBand()
        .domain(data.map((d, i) => i))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i) + margin.left)
        .attr('y', (d) => yScale(d) + margin.top)
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => innerHeight - yScale(d))
        .attr('fill', barColor)
        .on('mouseover', (event, d) => {
          d3.select(event.target).attr('fill', 'red');
        })
        .on('mouseout', (event, d) => {
          d3.select(event.target).attr('fill', barColor);
        });

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
    };

    createBarChart();
  }, [data, width, height, barColor, xLabel, yLabel]);

  return <svg ref={svgRef} />;
};

export default BarChart;