import React, { createContext, useContext } from 'react';

import './Chart.css';

import { Dimensions } from '../../typings/types';

export const ChartContext = createContext<Dimensions | undefined>(undefined);
export const useDimensionsContext = () => useContext(ChartContext);

type ChartProps = {
  dimensions: Dimensions;
  children: React.ReactNode;
};

const Chart = ({ dimensions, children }: ChartProps) => (
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
