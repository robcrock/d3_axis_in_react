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
  const numberOfTicks = innerHeight / 70;
  const ticks = scale.ticks(numberOfTicks);

  return (
    <AxisVerticalWrapper {...props}>
      <AxisLine y2={innerHeight} />
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
            {formatTick(tick)}
          </AxisTick>
        </g>
      ))}

      {label && (
        <AxisLabel
          style={{
            transform: `translate(0px, -20px)`,
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
