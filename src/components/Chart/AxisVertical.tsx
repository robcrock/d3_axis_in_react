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

      {/* {ticks.map((tick, i) => {
        console.log('x1 ', dimensions.marginLeft);
        console.log('x2 ', dimensions.innerWidth);
        console.log('yScale tick ', scale(tick));

      })} */}
      {ticks.map((tick, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={scale(tick)}
            x2={dimensions.innerWidth}
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
