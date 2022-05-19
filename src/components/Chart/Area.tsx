import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type AreaProps = {
  data: Record[];
  xAccessorScaled: (d: Record) => number;
  yAccessorScaled: (d: Record) => number;
  y0AccessorScaled: (d: Record) => number | number;
  style: { fill: string };
};

const Area = ({
  data,
  xAccessorScaled,
  y0AccessorScaled,
  yAccessorScaled,
  ...props
}: AreaProps) => {
  const areaGenerator = d3
    .area()
    .x(xAccessorScaled)
    .y0(y0AccessorScaled)
    .y1(yAccessorScaled)
    .curve(d3.curveMonotoneX);

  return (
    <path
      {...props}
      className={`Line Line--type-area`}
      d={areaGenerator(data)}
    />
  );
};

export default Area;
