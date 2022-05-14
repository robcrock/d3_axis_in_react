import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart/Chart';
import Axis from './Chart/Axis';
import { useChartDimensions } from './utils';
import { Dimensions, D } from '../typings/types';

const formatDate = d3.timeFormat('%-b %-d');

type TimelineProps = {
  data: D[];
  xAccessor: (d: D) => Date | null;
  yAccessor: (d: D) => number;
  label: string;
};

const defaulSetting: Dimensions = {
  height: 500,
  width: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  boundedHeight: 0,
  boundedWidth: 0,
};

const Timeline: React.FC<TimelineProps> = ({
  data,
  xAccessor,
  yAccessor,
  label,
}) => {
  const [ref, dimensions] = useChartDimensions(defaulSetting);

  const [xMin = 0, xMax = 0] = d3.extent(data, xAccessor);
  const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, dimensions.boundedWidth]);

  const [yMin = 0, yMax = 0] = d3.extent(data, yAccessor);
  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([dimensions.boundedHeight, 0])
    .nice();

  return (
    <div className='Timeline' ref={ref}>
      <div>Timeline dimensions</div>
      <pre>{JSON.stringify(dimensions, null, 2)}</pre>
      <Chart dimensions={dimensions}>
        <Axis dimension='x' scale={xScale} formatTick={formatDate} />
        <Axis dimension='y' scale={yScale} label={label} />
      </Chart>
    </div>
  );
};

export default Timeline;
