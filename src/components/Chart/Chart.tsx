import React, { useContext } from 'react';
import { DimensionContext } from '../Timeline';

import './Chart.css';

interface ChartProps {
  children: React.ReactNode;
}

const Chart = ({ children }: ChartProps) => {
  const dimensions = useContext(DimensionContext);

  console.log('Dimensions from chart ', dimensions);
  return (
    <svg className='Chart' width={dimensions.width} height={500}>
      {/* <svg className='Chart' width={dimensions.width} height={dimensions.height}> */}
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  );
};

export default Chart;
