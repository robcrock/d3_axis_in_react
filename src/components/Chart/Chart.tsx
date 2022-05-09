import React, { createContext, useContext } from 'react';
import { DimensionProps } from '../../typings/types';

import './Chart.css';

const ChartContext = createContext({});
export const useChartDimensions = () => useContext(ChartContext);

type TypedChart = {
  dimensions: DimensionProps;
  children: React.ReactNode;
};

const Chart: React.FC<TypedChart> = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
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