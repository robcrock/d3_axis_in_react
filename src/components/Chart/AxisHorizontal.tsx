import React from 'react';

import useChartContext from '../../hooks/useChartContext';

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
  const { dimensions } = useChartContext();

  const numberOfTicks = dimensions.innerWidth / 100;

  const ticks = scale.ticks(numberOfTicks);

  // function transformTickText(d: Date) {
  //   const currentMonth = d;
  //   const nextMonth = new Date(
  //     currentMonth.getFullYear(),
  //     currentMonth.getMonth() + 1,
  //     1,
  //   );
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
        <g key={i} transform={`translate(${scale(tick)}, 25)`}>
          <line stroke='#ccc' y2='6' transform={`translate(0, -25)`} />
          <text key={i} className='Axis__tick'>
            {formatTick(tick)}
          </text>
        </g>
      ))}

      {/* {ticks?.map((tick, i) => (
        <g key={i} transform={`translate(${scale(tick)}, 25)`}>
          <line stroke='#ccc' y2='6' transform={`translate(0, -25)`} />
          <text className='Axis__tick' transform={transformTickText(tick)}>
            {formatTick(tick)}
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
