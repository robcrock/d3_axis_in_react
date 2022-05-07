import React, { useMemo } from 'react';
import * as d3 from 'd3';

import { TDimensions } from '../utils';

type TypedAxis = {
  dimensions: TDimensions;
  label: string;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
};

const Axis: React.FC<TypedAxis> = ({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}) => {
  let domain = [0, 100];
  let range = [10, 290];

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear().domain(domain).range(range);

    const width = range[1] - range[0];
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));

    return xScale.ticks(numberOfTicksTarget).map(value => ({
      value,
      xOffset: xScale(value),
    }));
  }, [domain.join('-'), range.join('-')]);

  return (
    <svg>
      <path
        d={['M', range[0], 6, 'v', -6, 'H', range[1], 'v', 6].join(' ')}
        fill='none'
        stroke='currentColor'
      />
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2='6' stroke='currentColor' />
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Axis;
