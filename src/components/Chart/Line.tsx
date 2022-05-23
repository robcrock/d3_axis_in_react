import React from 'react';
import { line, curveMonotoneX } from 'd3';

import { AccessorFn } from '../../typings/types';

import useChartContext from '../../hooks/useChartContext';

type LineProps = {
  xAccessorScaled: AccessorFn;
  yAccessorScaled: AccessorFn;
};

const Line = ({ xAccessorScaled, yAccessorScaled, ...props }: LineProps) => {
  const { data } = useChartContext();

  const lineGenerator = line()
    .x(xAccessorScaled)

    .y(yAccessorScaled)
    .curve(curveMonotoneX);

  return (
    <path
      {...props}
      className={`Line Line--type-line`}
      d={lineGenerator(data as Iterable<[number, number]>)!}
    />
  );
};

export default Line;
