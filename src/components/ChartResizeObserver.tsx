import React, { createContext, useContext } from 'react';

const ChartContext = createContext(null);
export const useDimensionsContext = () => useContext(ChartContext);

const ChartResizeObserver = ({ dimensions, children }) => (
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

export default ChartResizeObserver;
