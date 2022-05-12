import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart/Chart';
import Axis from './Chart/Axis';
import { useChartDimensions } from './utils';
import { Dimensions } from '../typings/types';

const formatDate = d3.timeFormat('%-b %-d');

type Data = any[];

type TimelineProps = {
  data: Data;
  xAccessor: (d: Data) => Date;
  yAccessor: (d: Data) => number;
  label: string;
};

const defaulSetting: Dimensions = {
  height: 600,
  width: 700,
  marginTop: 40,
  marginRight: 30,
  marginBottom: 40,
  marginLeft: 75,
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

  const [xMin, xMax] = d3.extent(data, xAccessor);
  const xScale = d3
    .scaleTime()
    .domain([xMin ?? new Date(2022, 1), xMax ?? new Date(2022, 12)])
    .range([0, dimensions.boundedWidth]);

  const [yMin, yMax] = d3.extent(data, yAccessor);
  const yScale = d3
    .scaleLinear()
    .domain([yMin ?? 0, yMax ?? 0])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = (d: any) => xScale(xAccessor(d));
  const yAccessorScaled = (d: any) => yScale(yAccessor(d));
  const y0AccessorScaled = yScale(yScale.domain()[0]);

  const dims = {
    ...dimensions,
    boundedHeight: Math.max(
      dimensions.height - dimensions.marginTop - dimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      dimensions.width - dimensions.marginLeft - dimensions.marginRight,
      0,
    ),
  };

  return (
    <div className='Timeline' ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis dimension='x' scale={xScale} formatTick={formatDate} />
        <Axis dimension='y' scale={yScale} label={label} />
      </Chart>
    </div>
  );
};

export default Timeline;
