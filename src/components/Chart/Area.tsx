import React from 'react';
import * as d3 from 'd3';
import { Record } from '../../typings/types';

type AreaProps = {
  data: Record[];
  xAccessorScaled: (d: Record) => number;
  yAccessorScaled: (d: Record) => number;
  y0Scaled: number;
  style: { fill: string };
};

const Area = ({
  data,
  xAccessorScaled,
  yAccessorScaled,
  y0Scaled,
  ...props
}: AreaProps) => {
  const areaGenerator = d3
    .area()
    .x(xAccessorScaled)
    .y0(yAccessorScaled)
    .y1(y0Scaled)
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
