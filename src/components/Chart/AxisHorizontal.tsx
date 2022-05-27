import { timeDay, timeMonth, timeWeek } from 'd3';
import React from 'react';
import styled from 'styled-components';

import { AxisLabel, AxisLine, AxisTick } from '../../styles/styles';

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
  const majorTicks = scale.ticks(timeMonth.every(1));
  const minorTicks = scale.ticks(timeDay.every(1));

  console.log('ticks ', timeMonth.every(1));

  return (
    <AxisHorizontalWrapper
      transform={`translate(0, ${innerHeight})`}
      {...props}
    >
      <AxisLine x2={innerWidth} />

      {majorTicks.map((tick, i) => (
        <g key={i} transform={`translate(${scale(tick)}, 25)`}>
          <line stroke='#ccc' y2='6' transform={`translate(0, -25)`} />
          <AxisTick key={i}>{formatTick(tick)}</AxisTick>
        </g>
      ))}

      {minorTicks.map((tick, i) => (
        <line
          key={i}
          stroke='#ccc'
          y2='3'
          transform={`translate(${scale(tick)}, 0)`}
        />
      ))}

      {label && (
        <AxisLabel transform={`translate(${innerWidth / 2}, 60)`}>
          {label}
        </AxisLabel>
      )}
    </AxisHorizontalWrapper>
  );
};

const AxisHorizontalWrapper = styled.g`
  text-anchor: middle;
`;

const TickText = styled.text`
  text-anchor: middle;
`;

export default AxisHorizontal;
