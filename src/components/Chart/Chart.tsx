import React, { useRef, createContext, useContext } from 'react';
import { Dimensions } from '../../typings/types';

import './Chart.css';

// const defaulSetting: Dimensions = {
//   height: 0,
//   width: 0,
//   marginTop: 0,
//   marginRight: 0,
//   marginBottom: 0,
//   marginLeft: 0,
//   boundedHeight: 0,
//   boundedWidth: 0,
// };

const ChartContext = createContext();
export const useChartDimensions = () => useContext(ChartContext);

interface ChartProps {
  dimensions: Dimensions;
  children: React.ReactNode;
}

const Chart = ({ dimensions, children }: ChartProps) => (
  <ChartContext.Provider value={dimensions}>
    {/*
      Why does my chart continue to grow when I pass in
      width={dimensions.width} as the prop to height on the svg?
    */}
    <svg className='Chart' width={dimensions.width} height={500}>
      {/* <svg className='Chart' width={dimensions.width} height={dimensions.height}> */}
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
