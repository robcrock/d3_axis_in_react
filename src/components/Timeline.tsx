import * as d3 from 'd3';
import React, { useRef } from 'react';

import Chart from './Chart/Chart';
import './Chart/Chart.css';
import Axis from './Chart/Axis';
import useResizeObserver from '../hooks/useResizeObserver';
import { D } from '../typings/types';

export const DimensionContext = React.createContext();

const formatDate = d3.timeFormat('%-b %-d');

type TimelineProps = {
  data: D[];
  xAccessor: (d: D) => Date | null;
  yAccessor: (d: D) => number;
  label: string;
};

const Timeline: React.FC<TimelineProps> = ({
  data,
  xAccessor,
  yAccessor,
  label,
}) => {
  const wrapperRef: React.MutableRefObject<null> = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

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
    <div className='Timeline' ref={wrapperRef}>
      <DimensionContext.Provider value={dimensions}>
        <Chart>
          <Axis dimension='x' scale={xScale} formatTick={formatDate} />
          <Axis dimension='y' scale={yScale} label={label} />
        </Chart>
      </DimensionContext.Provider>
    </div>
  );
};

export default Timeline;
