import React from 'react';
import * as d3 from 'd3';
import { DataRecord, AccessorType } from '../../typings/types';

type AreaProps = {
  data: DataRecord[];
  xAccessorScaled: AccessorType;
  yAccessorScaled: AccessorType;
  y0AccessorScaled: number;
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
      d={areaGenerator(data as Iterable<[number, number]>)!}
    />
  );
};

export default Area;
