import React, { useContext } from 'react';
import * as d3 from 'd3';
import { DimensionContext } from '../Timeline';

type AxisHorizontalProps = {
  label: string;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
};

const AxisHorizontal = ({
  label,
  formatTick,
  scale,
  ...props
}: AxisHorizontalProps) => {
  const dimensions = useContext(DimensionContext);

  const numberOfTicks = dimensions.innerWidth / 100;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className='Axis AxisHorizontal'
      transform={`translate(0, ${dimensions.innerHeight})`}
      {...props}
    >
      <line className='Axis__line' x2={dimensions.innerWidth} />

      {ticks?.map((tick, i) => (
        <text
          key={i}
          className='Axis__tick'
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick?.(tick as Date)}
        </text>
      ))}

      {label && (
        <text
          className='Axis__label'
          transform={`translate(${dimensions.innerWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisHorizontal;
