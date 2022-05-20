import React, { useContext } from 'react';
import * as d3 from 'd3';
import { ChartContext } from './Chart';

type AxisHorizontalProps = {
  label?: string;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
};

const AxisHorizontal = ({
  label,
  formatTick,
  scale,
  ...props
}: AxisHorizontalProps) => {
  const dimensions = useContext(ChartContext);

  if (!dimensions) return;
  const numberOfTicks = dimensions.innerWidth / 100;

  const ticks = scale.ticks(numberOfTicks);

  // function transformTickText(d) {
  //   const currentMonth = d;
  //   const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
  //   const textNudge = (scale(nextMonth) - scale(currentMonth)) / 2;
  //   return `translate(${textNudge}, -10)`;
  // }

  return (
    <g
      className='Axis AxisHorizontal'
      transform={`translate(0, ${dimensions.innerHeight})`}
      {...props}
    >
      <line className='Axis__line' x2={dimensions.innerWidth} />

      {ticks.map((tick, i) => (
        <text
          key={tick}
          className='Axis__tick'
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick(tick)}
        </text>
      ))}

      {/* {ticks?.map((tick, i) => (
        <g key={i} transform={`translate(${scale(tick)}, 25)`}>
          <line stroke='#ccc' y2='6' transform={`translate(0, -25)`} />
          <text className='Axis__tick' transform={transformTickText(tick)}>
            {formatTick?.(tick as Date)}
          </text>
        </g>
      ))} */}

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
