import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type LineProps = {
  data: Record[];
  xAccessorScaled: (d: Record) => number;
  yAccessorScaled: (d: Record) => number;
};

const Line = ({
  data,
  xAccessorScaled,
  yAccessorScaled,
  ...props
}: LineProps) => {
  const lineGenerator = d3
    .line()
    .x(xAccessorScaled)

    .y(yAccessorScaled)
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
