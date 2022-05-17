import React, { useContext } from 'react';
import { DimensionContext } from '../Timeline';
import './Chart.css';

interface ChartProps {
  children: React.ReactNode;
}

const Chart = ({ children }: ChartProps) => {
  const dimensions = useContext(DimensionContext);

  return (
    <svg className='Chart' width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        {children}
      </g>
    </svg>
  );
};

export default Chart;
