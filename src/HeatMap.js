import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data, width, height, xLabel, yLabel }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const createHeatmap = () => {
      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([d3.min(data.flat()), d3.max(data.flat())]);

      const margin = { top: 40, right: 40, bottom: 40, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const cellWidth = innerWidth / data[0].length;
      const cellHeight = innerHeight / data.length;

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (_, i) => i * cellWidth)
        .attr('y', (_, j) => j * cellHeight)
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('fill', d => colorScale(d));

      if (xLabel) {
        svg.append('text')
          .attr('class', 'x-label')
          .attr('x', width / 2)
          .attr('y', height - margin.bottom)
          .attr('text-anchor', 'middle')
          .text(xLabel);
      }

      if (yLabel) {
        svg.append('text')
          .attr('class', 'y-label')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', margin.left - 10)
          .attr('text-anchor', 'middle')
          .text(yLabel);
      }
    };

    createHeatmap();
  }, [data, width, height, xLabel, yLabel]);

  return <svg ref={svgRef} />;
};

export default Heatmap;