import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type AreaProps = {
  data: Record[];
  xAccessorScaled: (d: Record) => number;
  y0AccessorScaled: (d: Record) => number;
  y1AccessorScaled: (d: Record) => number;
  style: { fill: string };
};

const Area = ({
  data,
  xAccessorScaled,
  y0AccessorScaled,
  y1AccessorScaled,
  ...props
}: AreaProps) => {
  const areaGenerator = d3
    .area()
    .x(xAccessorScaled)
    .y0(y0AccessorScaled)
    .y1(y1AccessorScaled)
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
