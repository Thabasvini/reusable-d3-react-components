import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data, width, height, labels }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createHistogram = () => {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const margin = { top: 20, right: 20, bottom: 40, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([0, innerWidth]);

      const histogram = d3.histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(10));

      const bins = histogram(data);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([innerHeight, 0]);

      const barWidth = innerWidth / bins.length;

      svg.selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr('x', (d, i) => margin.left + i * barWidth)
        .attr('y', d => margin.top + yScale(d.length))
        .attr('width', barWidth)
        .attr('height', d => innerHeight - yScale(d.length))
        .attr('fill', 'steelblue')
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);

      function handleMouseOver(event, d) {
        d3.select(this)
          .attr('fill', 'orange');
      }

      function handleMouseOut(event, d) {
        d3.select(this)
          .attr('fill', 'steelblue');
      }

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      if (labels) {
        svg.append('text')
          .attr('class', 'x-axis-label')
          .attr('x', width / 2)
          .attr('y', height - 10)
          .attr('text-anchor', 'middle')
          .text(labels.x);

        svg.append('text')
          .attr('class', 'y-axis-label')
          .attr('x', -height / 2)
          .attr('y', 15)
          .attr('text-anchor', 'middle')
          .attr('transform', 'rotate(-90)')
          .text(labels.y);
      }
    };

    createHistogram();
  }, [data, width, height, labels]);

  return <svg ref={svgRef} />;
};

export default Histogram;