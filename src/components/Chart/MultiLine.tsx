import React from 'react';
import { line, curveMonotoneX, text } from 'd3';
import styled from 'styled-components';

import { AccessorFn, DataRecord } from '../../typings/types';

type LineProps = {
  data: DataRecord[];
  xAccessorScaled: AccessorFn;
  yAccessorScaled: AccessorFn;
};

const MultiLine = ({
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
            stroke={['#556495', '#dfb016'][i]}
            d={lineGenerator(data as Iterable<[number, number]>)!}
          />
          <LineLabel
            transform={`translate(8, 0)`}
            x={xAccessorScaled(data[data.length - 1])}
            y={yAccessorScaled(data[data.length - 1])}
            fill={['#556495', '#dfb016'][i]}
          >
            {data[data.length - 1].test_ordered}
          </LineLabel>
        </g>
      ))}
    </>
  );
};

const Line = styled.path`
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const LineLabel = styled.text`
  dominant-baseline: middle;
  font-weight: 600;
`;

export default MultiLine;
