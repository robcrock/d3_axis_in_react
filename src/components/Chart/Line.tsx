import React from 'react';
import * as d3 from 'd3';
import { DataRecord, AccessorType } from '../../typings/types';

type LineProps = {
  data: DataRecord[];
  xAccessorScaled: AccessorType;
  yAccessorScaled: AccessorType;
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
      d={lineGenerator(data as Iterable<[number, number]>)!}
    />
  );
};

export default Line;
