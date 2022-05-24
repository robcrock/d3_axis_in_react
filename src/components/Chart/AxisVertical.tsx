import React from 'react';

import './Chart.css';

type AxisVerticalProps = {
  innerWidth: number;
  innerHeight: number;
  label?: string;
  formatTick: (date: number) => string;
  scale: d3.ScaleLinear<number, number, never>;
};

const AxisVertical = ({
  innerWidth,
  innerHeight,
  label,
  formatTick,
  scale,
  ...props
}: AxisVerticalProps) => {
  const numberOfTicks = innerHeight / 70;
  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className='Axis AxisVertical' {...props}>
      <line className='Axis__line' y2={innerHeight} />
      {ticks.map((tick, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={scale(tick)}
            x2={innerWidth}
            y2={scale(tick)}
            stroke='#EBEBEB'
          ></line>
          <text
            key={i}
            className='Axis__tick'
            transform={`translate(-16, ${scale(tick)})`}
          >
            {formatTick(tick)}
          </text>
        </g>
      ))}

      {label && (
        <text
          className='Axis__label'
          style={{
            transform: `translate(-56px, ${innerHeight / 2}px) rotate(-90deg)`,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default AxisVertical;
