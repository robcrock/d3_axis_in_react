import React, { createContext, useContext } from 'react';
import { Dimensions } from '../../typings/types';

import './Chart.css';

export const ChartContext = createContext({});
export const useChartDimensions = () => useContext(ChartContext);

interface ChartProps {
  dimensions: Dimensions;
  children: React.ReactNode;
}

const Chart = ({ dimensions, children }: ChartProps) => (
  <ChartContext.Provider value={dimensions}>
    <div>Chart dimensions</div>
    <pre>{JSON.stringify(dimensions, null, 2)}</pre>
    <svg className='Chart' width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
