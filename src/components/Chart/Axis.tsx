import React from 'react';
import * as d3 from 'd3';

import { DimensionProps } from '../../typings/types';

type AxisProps = {
  dimensions: DimensionProps;
  label: string;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
};

const Axis: React.FC<AxisProps> = ({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}) => {
  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <svg>
      <g
        className='Axis AxisHorizontal'
        transform={`translate(0, ${dimensions.boundedHeight})`}
        {...props}
      >
        <line className='Axis__line' x2={dimensions.boundedWidth} />

        {ticks.map((tick, i) => (
          <text
            key={i}
            className='Axis__tick'
            transform={`translate(${scale(tick)}, 25)`}
          >
            {formatTick(tick)}
          </text>
        ))}

        {label && (
          <text
            className='Axis__label'
            transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
          >
            {label}
          </text>
        )}
      </g>
    </svg>
  );
};

export default Axis;
