import React from 'react';
import { extent, scaleLinear, timeFormat, format } from 'd3';
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
  if (!processedData || !data) return <div style={{ width, height }} />;

  // Margin Convention
  const margin = { top: 60, right: 160, bottom: 40, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create accessor functions
  const xAccessor: AccessorFn = d => new Date(d.collection_date);
  const yAccessor: AccessorFn = d => d.covid_positivity;

  const xExtent = extent(data, xAccessor);
  const yExtent = extent(data, yAccessor);

  // Create scales
  const xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  const yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);

  // Scale the accessor fuctions
  const xAccessorScaled: AccessorFn = d => xScale(xAccessor(d));
  const yAccessorScaled: AccessorFn = d => yScale(yAccessor(d));

  const xTickFormatter = timeFormat('%-m/%d');
  const yTickFormatter = format('.0%');

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
        />
        <AxisVertical
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          scale={yScale}
          label={'Positivity Rate'}
          formatTick={yTickFormatter}
        />
        <MultiLine
          data={processedData}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
        />
      </g>
    </ChartResizeObserver>
  );
};

export default MultiLineChart;
