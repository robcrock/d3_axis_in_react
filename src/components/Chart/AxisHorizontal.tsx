import React from 'react';

import './Chart.css';

type AxisHorizontalProps = {
  label?: string;
  innerWidth: number;
  innerHeight: number;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
};

const AxisHorizontal = ({
  innerWidth,
  innerHeight,
  label,
  formatTick,
  scale,
  ...props
}: AxisHorizontalProps) => {
  const numberOfTicks = innerWidth / 100;
  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className='Axis AxisHorizontal'
      transform={`translate(0, ${innerHeight})`}
      {...props}
    >
      <line className='Axis__line' x2={innerWidth} />

      {ticks.map((tick, i) => (
        <g key={i} transform={`translate(${scale(tick)}, 25)`}>
          <line stroke='#ccc' y2='6' transform={`translate(0, -25)`} />
          <text key={i} className='Axis__tick'>
            {formatTick(tick)}
          </text>
        </g>
      ))}

      {label && (
        <text
          className='Axis__label'
          transform={`translate(${innerWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisHorizontal;
