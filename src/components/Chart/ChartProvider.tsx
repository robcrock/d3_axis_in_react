import React, { createContext, useMemo } from 'react';

import './Chart.css';

import { DataRecord, Dimensions } from '../../typings/types';

type ChartContextValue = {
  data: DataRecord[];
  dimensions: Dimensions;
};

export const ChartContext = createContext<ChartContextValue | undefined>(
  undefined,
);

type ChartProps = {
  data: DataRecord[];
  dimensions: Dimensions;
  children: React.ReactNode;
};

const ChartProvider = ({ data, dimensions, children }: ChartProps) => {
  const chartValue = useMemo(() => {
    return {
      data,
      dimensions,
    };
  }, [data, dimensions]);

  return (
    <ChartContext.Provider value={chartValue}>
      <svg
        className='Chart'
        width={dimensions.width}
        height={dimensions.height}
      >
        <g
          transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
        >
          {children}
        </g>
      </svg>
    </ChartContext.Provider>
  );
};

export default ChartProvider;
