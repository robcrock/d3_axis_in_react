import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Chart from './Chart/Chart';
import Line from './Chart/Line';
import Axis from './Chart/Axis-naive';
import { useChartDimensions, accessorPropsType } from './Chart/utils';

const formatDate = d3.timeFormat('%-b %-d');

type TimelineProps = {
  data: any;
  xAccessor: any;
  yAccessor: any;
  label: any;
};

const Timeline: React.FunctionComponent<TimelineProps> = ({
  data,
  xAccessor,
  yAccessor,
  label,
}) => {
  return <div className='Timeline'></div>;
};

Timeline.propTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string,
};

Timeline.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y,
};

export default Timeline;
