import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { D } from '../../typings/types';

type LineProps = {
  type: 'line' | 'area';
  data: D[];
  xAccessor: () => any;
  yAccessor: () => any;
  y0Accessor: () => any;
  y1Accessor: () => any;
  interpolation: any;
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
  const lineGenerator = d3.line().x(xAccessor).y(yAccessor);

  const areaGenerator = d3.area().x(xAccessor).y0(y0Accessor).y1(yAccessor);

  return (
    <path
      {...props}
      className={`Line Line--type-${type}`}
      d={type === 'line' ? lineGenerator(data) : areaGenerator(data)}
    />
  );
};

export default Line;
