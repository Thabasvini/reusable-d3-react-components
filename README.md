Reusable Charts Library

This library provides a collection of interactive and visually appealing charts implemented using React and D3.js. These charts offer powerful data visualization capabilities for your web applications. The library includes the following chart components:

LineChart: A line chart that displays the trend of a numerical dataset over a continuous range. It supports customizable attributes such as width, height, line color, and axis labels.

ScatterPlot: A scatter plot that visualizes the relationship between two numerical variables. It allows you to plot data points and customize attributes such as width, height, point color, and axis labels.

PieChart: A pie chart that represents the distribution of categorical data as proportions of a whole. It supports custom colors, labels, and interactive features like hover effects.

AreaChart: An area chart that shows the magnitude or proportion of values over a continuous range. It offers customization options for width, height, area color, and the ability to include labels.

Installation
To use these charts in your project, you need to install the charts-library package. You can do this by running the following command:


npm install charts-library
Usage
Import the desired chart component from the charts-library package, and render it within your React application.

Example usage of LineChart:


import React from 'react';
import LineChart from 'charts-library';

const App = () => {
  const data = [10, 20, 30, 40, 50];
  const width = 500;
  const height = 300;
  const lineColor = '#ff0000';
  const xLabel = 'X Axis';
  const yLabel = 'Y Axis';

  return (
    <div>
      <h1>Line Chart Example</h1>
      <LineChart
        data={data}
        width={width}
        height={height}
        lineColor={lineColor}
        xLabel={xLabel}
        yLabel={yLabel}
      />
    </div>
  );
};

export default App;
You can similarly use other chart components such as ScatterPlot, PieChart, and AreaChart by importing them and passing the required props.


If you have any questions, feedback, or suggestions, please don't hesitate to contact me.

Happy charting!