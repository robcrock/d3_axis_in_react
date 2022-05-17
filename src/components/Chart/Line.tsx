import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { Data } from '../../typings/types';

type LineProps = {
  type: 'line' | 'area';
  data: Data[];
  xAccessor: () => number;
  yAccessor: () => number;
  y0Accessor: () => number;
  y1Accessor: () => number;
  interpolation?: d3.CurveFactory;
};

const Line = ({
  type = 'line',
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation,
  ...props
}: LineProps) => {
  const lineGenerator = d3
    .line()
    .x(xAccessor)
    .y(yAccessor)
    .curve(d3.curveNatural);

  const areaGenerator = d3
    .area()
    .x(xAccessor)
    .y0(y0Accessor)
    .y1(yAccessor)
    .curve(d3.curveNatural);

  return (
    <path
      {...props}
      className={`Line Line--type-${type}`}
      d={type === 'line' ? lineGenerator(data) : areaGenerator(data)}
    />
  );
};

export default Line;
