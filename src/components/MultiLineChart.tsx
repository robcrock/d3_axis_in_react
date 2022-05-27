import React from 'react';
import {
  extent,
  scaleLinear,
  timeFormat,
  format,
  scaleTime,
  timeMonth,
  scaleLog,
} from 'd3';
import { DataRecord, AccessorFn } from '../typings/types';

import MultiLine from './Chart/MultiLine';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';

import ChartResizeObserver from './ChartResizeObserver';

type LineChartProps<Data extends DataRecord> = {
  data: DataRecord[] | null;
  processedData: DataRecord[] | null;
  width: number;
  height: number;
};

const MultiLineChart = <Data extends DataRecord>({
  data,
  processedData,
  width,
  height,
}: LineChartProps<Data>) => {
  const { original, transformed, chart } = data;
  if (!original || !transformed || !chart)
    return <div style={{ width, height }} />;

  // Margin Convention
  const margin = { top: 60, right: 80, bottom: 100, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create accessor functions
  const xAccessor: AccessorFn = d => new Date(d.date);
  const yAccessor: AccessorFn = d => d.value;

  const xExtent = extent(transformed, xAccessor);
  const yExtent = extent(transformed, yAccessor);

  console.log('data in chart ', data);
  console.log('xExtent ', xExtent);

  // Create scales
  const xScale = scaleTime().domain(xExtent).range([0, innerWidth]);
  // const yScale = scaleLog().domain([0, yExtent[1]]).range([innerHeight, 0]);
  const yScale = scaleLog().domain([0.0001, 1]).range([innerHeight, 0]);

  // Scale the accessor fuctions
  const xAccessorScaled: AccessorFn = d => xScale(xAccessor(d));
  const yAccessorScaled: AccessorFn = d => yScale(yAccessor(d));

  const xTickFormatter = timeFormat('%B');
  const yTickFormatter = format('');

  return (
    <ChartResizeObserver
      dimensions={{ margin, height, innerHeight, width, innerWidth }}
    >
      <g transform={`translate(${margin.left} ${margin.top})`}>
        <AxisHorizontal
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          scale={xScale}
          formatTick={xTickFormatter}
          label={'Collection Date'}
        />
        <AxisVertical
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          scale={yScale}
          label={'Positivity Rate (log scale)'}
          formatTick={yTickFormatter}
        />
        <MultiLine
          data={chart}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
        />
      </g>
    </ChartResizeObserver>
  );
};

export default MultiLineChart;
