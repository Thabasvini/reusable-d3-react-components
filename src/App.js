import React from 'react';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';
import PieChart from './PieChart';
import AreaChart from './AreaChart';
import Histogram from './Histogram';
import Heatmap from './HeatMap';

const App = () => {
  const HistogramLabels = {
    x: 'Value',
    y: 'Frequency'
  };

 
  return (
    <div>
      <header><h1>Reusable d3 React Components</h1></header>
      <h1>Bar Chart</h1>
      <BarChart data={[10, 20, 30, 40, 50]} width={400} height={200} barColor={'green'} xLabel={'X-Axis Label'}
      yLabel={'Y-Axis Label'}/>
      <h3>Description</h3>
      <p>The BarChart component is a reusable React component that generates a bar chart based on provided data. It supports dynamic sizing, customizable styling with adjustable bar color, automatic generation of axes and labels, and hover interaction for enhanced user experience. By incorporating the BarChart component, you can easily visualize and explore data in the form of interactive and visually appealing bar charts within your React applications.</p>
       <h1>Line Chart</h1>
      <LineChart
        data={[5, 10, 15, 8, 12, 6, 18]}
        width={400}
        height={200}
        lineColor="blue"
        xLabel="X-Axis Label"
        yLabel="Y-Axis Label"
      />
      <h3>Description</h3>
      <p>The LineChart component is a reusable React component that generates a line chart based on provided data. It supports dynamic sizing, customizable styling with adjustable line color, automatic generation of axes and labels, animated line drawing, and interactive data points with a tooltip displaying the hovered value. By incorporating the LineChart component, you can easily visualize and analyze data trends over time in a visually engaging and interactive manner within your React applications.</p>
       <h1>ScatterPlot</h1>
      <ScatterPlot
        data={ [
          { x: 1, y: 5 },
          { x: 2, y: 7 },
          { x: 3, y: 9 },
          { x: 4, y: 6 },
          { x: 5, y: 3 },
          { x: 6, y: 8 },
          { x: 7, y: 4 },
        ]}
        width={400}
        height={300}
        color="steelblue"
        xLabel="X-Axis Label"
        yLabel="Y-Axis Label"
      />
      <h3>Description</h3>
      <p>The ScatterPlot component is a reusable React component that generates a scatter plot based on the provided data. It supports dynamic sizing, customizable styling with adjustable point color, automatic generation of axes and labels, and enables zooming and panning functionality for exploring the scatter plot in detail. By incorporating the ScatterPlot component, you can easily visualize and analyze the relationships and distributions of data points within your React applications.</p>
      <h1>Pie Chart </h1>
      <PieChart
        data={[30, 40, 20, 10]}
        width={400}
        height={400}
        color={['steelblue', 'orange', 'green', 'purple']}
        labels={['Label 1', 'Label 2', 'Label 3', 'Label 4']}
      />
      <h3>Description</h3>
      <p>The PieChart component is a React component that generates a pie chart based on the provided data. It supports customizable sizing, color schemes, and labels. The pie chart is dynamically rendered using the D3 library, and it allows for interactive slice highlighting on hover. The component enables you to visually represent data distribution in a concise and informative manner within your React applications.</p>
      <h1>Area Chart</h1>
      <AreaChart
        data={[10, 20, 15, 25, 30, 20, 15]}
        width={400}
        height={300}
        color={'steelblue'}
        labels={['A', 'B', 'C', 'D', 'E', 'F', 'G']}
      /> 
      <h3>Description</h3>
      <p>The AreaChart component is a versatile and visually appealing chart that showcases data trends using an area graph. It is implemented using React and D3.js. The component takes in various props such as data, width, height, color, and labels to customize the chart's appearance and content. The chart renders a smooth and visually appealing area graph, highlighting the magnitude or proportion of values over a continuous range. Additionally, it supports the inclusion of labels for each data point, enhancing the readability and providing further context. The AreaChart component is a powerful tool for visualizing data trends and patterns, suitable for a wide range of applications.</p>
      <h1>Histogram </h1>
      <Histogram
        data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 40, 30, 20]}
        width={500}
        height={300}
        labels={HistogramLabels}
      />
       <h3>Description</h3>
       <p>A histogram is a graphical representation of the distribution of data. It is commonly used to display the frequency or count of values within specified intervals or bins. In the context of React, a histogram can be implemented as a reusable component that encapsulates the logic and rendering of the histogram chart. This allows developers to easily incorporate histogram visualizations into their React applications by passing in data, width, height, and other necessary parameters. </p>
       <h1>Heatmap</h1>
        <Heatmap 
        data={[
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]} 
        width={300} 
        height={200} 
        xLabel={'X Label'} 
        yLabel={'Y Label'} />
        <h3>Description</h3>
        <p>A Heatmap is a powerful data visualization technique that uses color to represent values in a matrix-like layout. It provides a concise summary of data by displaying patterns, trends, and variations. The Heatmap component provided here is a reusable React component that enables you to effortlessly create and display heatmaps. With customizable dimensions and labels for the x-axis and y-axis, you can effectively visualize your data in a visually appealing and informative manner. Leveraging the capabilities of D3.js, the Heatmap component dynamically generates the heatmap based on the input data, ensuring scalability and accuracy.</p>
    </div>
    
  );
};

export default App;





