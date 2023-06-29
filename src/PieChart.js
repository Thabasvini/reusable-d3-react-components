import React, { useState } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width, height, color, labels }) => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const handleSliceHover = (event, index) => {
    setSelectedSlice(index);
  };

  const handleSliceLeave = () => {
    setSelectedSlice(null);
  };

  const pie = d3.pie().value((d) => d);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2);

  const colorScale = d3.scaleOrdinal(color);

  const pieData = pie(data);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((slice, index) => (
          <path
            key={index}
            d={arc(slice)}
            fill={colorScale(index)}
            opacity={selectedSlice === index ? 0.8 : 1}
            onMouseEnter={(e) => handleSliceHover(e, index)}
            onMouseLeave={handleSliceLeave}
          />
        ))}
        {labels.map((label, index) => (
          <text
            key={index}
            transform={`translate(${arc.centroid(pieData[index])})`}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={selectedSlice === index ? 'white' : 'black'}
            fontWeight={selectedSlice === index ? 'bold' : 'normal'}
          >
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
};

export default PieChart;