import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type LineProps = {
  data: Record;
  xAccessor: (d: Record) => number;
  yAccessor: (d: Record) => number;
};

const Line = ({ data, xAccessor, yAccessor, ...props }: LineProps) => {
  const lineGenerator = d3
    .line()
    .x(xAccessor)
    .y(yAccessor)
    .curve(d3.curveMonotoneX);

  return (
    <path
      {...props}
      className={`Line Line--type-line`}
      d={lineGenerator(data)}
    />
  );
};

export default Line;
