import * as d3 from 'd3';
import React, { useRef } from 'react';

import Chart from './Chart/Chart';
import './Chart/Chart.css';
import Axis from './Chart/Axis';
import Gradient from './Chart/Gradient';
import { useUniqueId } from './Chart/utils';
import useResizeObserver from '../hooks/useResizeObserver';
import { Dimensions } from '../typings/types';
import { Record } from '../typings/types';
import Line from './Chart/Line';
import Area from './Chart/Area';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';
import Circles from './Chart/Circles';

// const formatDate = d3.timeFormat('%b');
const formatDate = d3.timeFormat('%-b %-d');
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa'];

type TimelineProps = {
  data: Record[];
  xAccessor: (d: Record) => Date;
  yAccessor: (d: Record) => number;
  label: string;
};

const Timeline = ({ data, xAccessor, yAccessor, label }: TimelineProps) => {
  const [ref, dimensions] = useResizeObserver({
    marginTop: 40,
    marginRight: 170,
    marginBottom: 40,
    marginLeft: 80,
    height: 0,
    width: 0,
    innerHeight: 0,
    innerWidth: 0,
  });

  const gradientId = useUniqueId('Timeline-gradient');

  const [xMin = 0, xMax = 0] = d3.extent(data, xAccessor);
  const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, dimensions.innerWidth]);

  const [yMin = 0, yMax = 0] = d3.extent(data, yAccessor);
  const yScale = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([dimensions.innerHeight, 0])
    .nice();

  const y0Accessor = (d: Record) => d.min_temp_F;
  const y1Accessor = (d: Record) => d.max_temp_F;

  const xAccessorScaled = d => xScale(xAccessor(d));
  const yAccessorScaled = d => yScale(yAccessor(d));
  // const y0AccessorScaled = (d: any) => yScale(y0Accessor(d))

  const y0AccessorScaled = yScale(yScale.domain()[0]);
  const y1AccessorScaled = (d: any) => yScale(y1Accessor(d));
  const keyAccessor = (d, i) => i;

  return (
    <div className='Timeline' ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2='0' y2='100%' />
        </defs>
        <AxisHorizontal scale={xScale} formatTick={formatDate} />
        <AxisVertical label={label} scale={yScale} />
        <Area
          data={data}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
          y0AccessorScaled={y0AccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
        <Line
          data={data}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  );
};

export default Timeline;
