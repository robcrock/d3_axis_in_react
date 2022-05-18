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

export const DimensionContext = React.createContext<Dimensions | null>(null);

const formatDate = d3.timeFormat('%-b %-d');
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa'];

type TimelineProps = {
  data: Record[];
  xAccessor: (d: Record) => Date;
  yAccessor: (d: Record) => number;
  label: string;
};

const Timeline = ({ data, xAccessor, yAccessor, label }: TimelineProps) => {
  const wrapperRef: React.MutableRefObject<null> = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  const gradientId = useUniqueId('Timeline-gradient');

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

  const xAccessorScaled = (d: Record) => xScale(xAccessor(d));
  const yAccessorScaled = (d: Record) => yScale(yAccessor(d));
  const y0Scaled = yScale(yScale.domain()[0]);

  return (
    <div className='Timeline' ref={wrapperRef}>
      <DimensionContext.Provider value={dimensions}>
        <Chart>
          <defs>
            <Gradient
              id={gradientId}
              colors={gradientColors}
              x2='0'
              y2='100%'
            />
          </defs>
          <Axis dimension='x' scale={xScale} formatTick={formatDate} />
          <Axis dimension='y' scale={yScale} label={label} />
          <Area
            data={data}
            xAccessorScaled={xAccessorScaled}
            yAccessorScaled={yAccessorScaled}
            y0Scaled={y0Scaled}
            style={{ fill: `url(#${gradientId})` }}
          />
          <Line
            data={data}
            xAccessorScaled={xAccessorScaled}
            yAccessorScaled={yAccessorScaled}
          />
        </Chart>
      </DimensionContext.Provider>
    </div>
  );
};

export default Timeline;
