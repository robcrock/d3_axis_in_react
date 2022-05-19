import React, { createContext, useContext } from 'react';

import './Chart.css';

export const ChartContext = createContext();
export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({ dimensions, children }) => (
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
