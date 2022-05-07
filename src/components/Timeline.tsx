import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart/Chart';
import Axis from './Chart/Axis';
import { useChartDimensions, useUniqueId } from './utils';

const formatDate = d3.timeFormat('%-b %-d');

type Data = any[];

type TypedTimeline = {
  data: Data;
  xAccessor: (d: Data) => Date;
  yAccessor: (d: Data) => number;
  label: string;
};

const Timeline: React.FC<TypedTimeline> = ({
  data,
  xAccessor,
  yAccessor,
  label,
}) => {
  const [ref, dimensions] = useChartDimensions(null);
  const gradientId = useUniqueId('Timeline-gradient');

  const [xMin, xMax] = d3.extent(data, xAccessor);

  const xScale = d3
    .scaleTime()
    .domain([xMin ?? new Date(2022, 1), xMax ?? new Date(2022, 12)])
    .range([0, dimensions.boundedWidth]);

  const xAccessorScaled = d => xScale(xAccessor(d));

  const height = 400;
  const width = 900;

  const bounds = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
  };

  const dims = {
    height,
    width,
    ...bounds,
    boundedHeight: Math.max(height - bounds.marginTop - bounds.marginBottom, 0),
    boundedWidth: Math.max(width - bounds.marginLeft - bounds.marginRight, 0),
  };

  return (
    <div className='Timeline' ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimensions={dims}
          scale={xScale}
          formatTick={formatDate}
          label='Date'
        />
      </Chart>
    </div>
  );
};

export default Timeline;
