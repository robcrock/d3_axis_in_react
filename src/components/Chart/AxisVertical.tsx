import { format } from 'd3';
import React from 'react';

import styled from 'styled-components';
import { AxisLabel, AxisLine, AxisTick } from '../../styles/styles';

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
  const numberOfTicks = innerHeight / 140;
  const ticks = scale.ticks(numberOfTicks);
  const getTickFormat = (tick: string, index: number) => {
    if (index === 0) {
      return format('.2%')(tick);
    } else if (index === 1) {
      return format('.1%')(tick);
    } else {
      return formatTick(tick);
    }
  };

  return (
    <AxisVerticalWrapper {...props}>
      <line y2={innerHeight} stroke='#ffffff' />
      {ticks.map((tick, i) => (
        <g key={i}>
          <line
            x1={0}
            y1={scale(tick)}
            x2={innerWidth}
            y2={scale(tick)}
            stroke='#EBEBEB'
          ></line>
          <AxisTick key={i} transform={`translate(-16, ${scale(tick)})`}>
            {getTickFormat(tick, i)}
          </AxisTick>
        </g>
      ))}

      {label && (
        <AxisLabel
          style={{
            transform: `translate(-60px, -24px)`,
            textAnchor: 'start',
          }}
        >
          {label}
        </AxisLabel>
      )}
    </AxisVerticalWrapper>
  );
};

const AxisVerticalWrapper = styled.g`
  dominant-baseline: middle;
  text-anchor: end;
`;

const TickText = styled.text`
  dominant-baseline: middle;
  text-anchor: end;
  font-size: 0.9em;
`;

export default AxisVertical;
