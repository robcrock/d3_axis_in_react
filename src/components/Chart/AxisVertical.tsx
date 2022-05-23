import React from 'react';

import useChartContext from '../../hooks/useChartContext';

type AxisVerticalProps = {
  label?: string;
  formatTick: (date: number) => string;
  scale: d3.ScaleLinear<number, number, never>;
};

const AxisVertical = ({
  label,
  formatTick,
  scale,
  ...props
}: AxisVerticalProps) => {
  const { dimensions } = useChartContext();

  const numberOfTicks = dimensions.innerHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className='Axis AxisVertical' {...props}>
      <line className='Axis__line' y2={dimensions.innerHeight} />

      {ticks.map((tick, i) => (
        <text
          key={i}
          className='Axis__tick'
          transform={`translate(-16, ${scale(tick)})`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className='Axis__label'
          style={{
            transform: `translate(-56px, ${
              dimensions.innerHeight / 2
            }px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisVertical;
