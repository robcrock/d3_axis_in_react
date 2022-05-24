import React from 'react';
import { line, curveMonotoneX } from 'd3';
import styled from 'styled-components';

import { AccessorFn } from '../../typings/types';

import useChartContext from '../../hooks/useChartContext';

type LineProps = {
  xAccessorScaled: AccessorFn;
  yAccessorScaled: AccessorFn;
};

const Line = styled.path`
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
`;

const MultiLine = ({
  xAccessorScaled,
  yAccessorScaled,
  ...props
}: LineProps) => {
  const { data } = useChartContext();

  const lineGenerator = line()
    .x(xAccessorScaled)
    .y(yAccessorScaled)
    .curve(curveMonotoneX);

  return (
    <>
      {data.map((data, i) => (
        <Line
          key={i}
          {...props}
          className={`Line Line--type-line`}
          stroke={['#556495', '#dfb016'][i]}
          d={lineGenerator(data as Iterable<[number, number]>)!}
        />
      ))}
    </>
  );
};

export default MultiLine;
