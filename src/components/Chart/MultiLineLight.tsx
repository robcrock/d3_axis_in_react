import React from 'react';
import { line, curveMonotoneX, text } from 'd3';
import styled from 'styled-components';

import { AccessorFn, DataRecord } from '../../typings/types';

type LineProps = {
  data: DataRecord[];
  xAccessorScaled: AccessorFn;
  yAccessorScaled: AccessorFn;
};

const MultiLineLight = ({
  data,
  xAccessorScaled,
  yAccessorScaled,
  ...props
}: LineProps) => {
  const lineGenerator = line()
    .x(xAccessorScaled)
    .y(yAccessorScaled)
    .curve(curveMonotoneX);

  return (
    <>
      {data.map((data, i) => (
        <g key={i}>
          <Line
            {...props}
            className={`Line Line--type-line`}
            stroke={['hsl(225, 27%, 80%)', 'hsl(45, 82%, 80%)'][i]}
            d={lineGenerator(data[1] as Iterable<[number, number]>)!}
          />
        </g>
      ))}
    </>
  );
};

const Line = styled.path`
  fill: none;
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const LineLabel = styled.text`
  dominant-baseline: middle;
  font-weight: 600;
`;

export default MultiLineLight;
