import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { accessorPropsType } from './utils';

type LineProps = {
  type: any;
  data: any;
  xAccessor: any;
  yAccessor: any;
  y0Accessor: any;
  interpolation: any;
};

const Line: React.FunctionComponent<LineProps> = ({
  type,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation,
  ...props
}) => {
  return <path {...props} className={`Line Line--type-${type}`} />;
};

Line.propTypes = {
  type: PropTypes.oneOf(['line', 'area']),
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  y0Accessor: accessorPropsType,
  interpolation: PropTypes.func,
};

Line.defaultProps = {
  type: 'line',
  y0Accessor: 0,
  interpolation: d3.curveMonotoneX,
};

export default Line;
