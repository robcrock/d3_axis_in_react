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

  console.log('processed data ', data);

  return (
    <>
      {data.map((data, i) => (
        <g key={i}>
          <Line
            {...props}
            className={`Line Line--type-line`}
            stroke={['#556495', '#dfb016'][i]}
            d={lineGenerator(data[1] as Iterable<[number, number]>)!}
          />
          <LineLabel
            transform={`translate(8, 0)`}
            x={xAccessorScaled(data[1][data[1].length - 1])}
            y={yAccessorScaled(data[1][data[1].length - 1])}
            fill={['#556495', '#dfb016'][i]}
          >
            {['COVID', 'Flu A'][i]}
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
