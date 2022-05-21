import * as d3 from 'd3';
import React from 'react';

import Chart from './Chart/Chart';
import './Chart/Chart.css';
import Gradient from './Chart/Gradient';
import { useUniqueId } from './Chart/utils';
import useResizeObserver from '../hooks/useResizeObserver';
import Line from './Chart/Line';
import Area from './Chart/Area';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';
import Circles from './Chart/Circles';
import { DataRecord, AccessorType } from '../typings/types';

// const formatDate = d3.timeFormat('%b');
const formatDate = d3.timeFormat('%-b %-d');
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa'];

// What's happening here is that we're retrun the value of the key of a
// property of the datum we're passing into ValueOf
type ValueOf<T> = T[keyof T];

type TimelineProps<Data extends DataRecord> = {
  data: Data[];
  xAccessor: AccessorType;
  yAccessor: AccessorType;
  label: string;
};

const Timeline = <Data extends DataRecord>({
  data,
  xAccessor,
  yAccessor,
  label,
}: TimelineProps<Data>) => {
  const [wrapperRef, dimensions] = useResizeObserver({
    marginTop: 40,
    marginRight: 20,
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
    .domain([yMin, yMax])
    .range([dimensions.innerHeight, 0])
    .nice();

  const y0Accessor = (d: Data) => d.min_temp_F;
  const y1Accessor = (d: Data) => d.max_temp_F;

  const xAccessorScaled: AccessorType = d => xScale(xAccessor(d));
  const yAccessorScaled: AccessorType = d => yScale(yAccessor(d));
  const y0AccessorScaled: number = yScale(yScale.domain()[0]);
  const y1AccessorScaled: AccessorType = d => yScale(y1Accessor(d));
  const keyAccessor: AccessorType = (d, i) => i;

  return (
    <div className='Timeline' ref={wrapperRef}>
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
