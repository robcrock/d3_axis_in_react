import React, { useContext } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

type AxisVerticalProps = {
  label?: string;
  scale: d3.ScaleLinear<number, number, never>;
};

const AxisVertical = ({ label, scale, ...props }: AxisVerticalProps) => {
  const dimensions = useContext(ChartContext);

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
          {tick}
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
