import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type AreaProps = {
  data: Record[];
  xAccessorScaled: (d: number) => number;
  yAccessor: (d: Record) => number;
  y0Accessor: number;
};

const Area = ({
  data,
  xAccessorScaled,
  yAccessor,
  y0Accessor,
  ...props
}: AreaProps) => {
  const areaGenerator = d3
    .area()
    .x(xAccessorScaled)
    .y0(y0Accessor)
    .y1(yAccessor)
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
