import React from 'react';
import { scaleTime, extent, scaleLinear, timeFormat, format } from 'd3';

import { DataRecord, AccessorFn } from '../typings/types';
import useResizeObserver from '../hooks/useResizeObserver';

import './Chart/Chart.css';

import ChartProvider from './Chart/ChartProvider';
import Line from './Chart/Line';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';

type LineChartProps<Data extends DataRecord> = {
  data: Data[];
  xAccessor: AccessorFn;
  yAccessor: AccessorFn;
  label: string;
};

const LineChart = <Data extends DataRecord>({
  data,
  xAccessor,
  yAccessor,
  label,
}: LineChartProps<Data>) => {
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

  // Set up your x scales and accessors
  const [xMin = 0, xMax = 0] = extent(data, xAccessor);
  const xScale = scaleTime()
    .domain([xMin, xMax])
    .range([0, dimensions.innerWidth]);

  const xAccessorScaled: AccessorFn = d => xScale(xAccessor(d));

  // Set up your y scales and accessors
  const [yMin = 0, yMax = 0] = extent(data, yAccessor);
  const yScale = scaleLinear()
    .domain([yMin, yMax])
    .range([dimensions.innerHeight, 0])
    .nice();

  const yAccessorScaled: AccessorFn = d => yScale(yAccessor(d));

  // Create formatting functions for the axes
  const formatDate = timeFormat('%b');
  const formatNumber = format(',');

  return (
    <div className='Timeline' ref={wrapperRef}>
      <ChartProvider data={data} dimensions={dimensions}>
        <AxisHorizontal scale={xScale} formatTick={formatDate} />
        <AxisVertical scale={yScale} label={label} formatTick={formatNumber} />
        <Line
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
        />
      </ChartProvider>
    </div>
  );
};

export default LineChart;
