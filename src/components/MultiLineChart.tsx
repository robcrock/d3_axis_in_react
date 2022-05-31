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
import useData from '../hooks/useData';
import MultiLineLight from './Chart/MultiLineLight';

type LineChartProps<Data extends DataRecord> = {
  dataSource: { path: string; type: string };
  processedData: DataRecord[] | null;
  width: number;
  height: number;
};

const MultiLineChart = <Data extends DataRecord>({
  dataSource,
  width,
  height,
}: LineChartProps<Data>) => {
  const { data, error } = useData(dataSource.path, dataSource.type);
  if (!data || error) return <div style={{ width, height }} />;
  const { original, transformed, chart } = data;

  // Margin Convention
  const margin = { top: 60, right: 80, bottom: 100, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create accessor functions
  const xAccessor: AccessorFn = d => new Date(d.date);
  const povitivityAccessor: AccessorFn = d => d.positivity;
  const povitivity7DayAccessor: AccessorFn = d => d.positivity_7_day_avg;

  const xExtent = extent(transformed, xAccessor);
  const yExtent = extent(transformed, povitivityAccessor);

  // Create scales
  const xScale = scaleTime().domain(xExtent).range([0, innerWidth]);
  // const yScale = scaleLog().domain([0, yExtent[1]]).range([innerHeight, 0]);
  const yScale = scaleLog().domain([0.0001, 1]).range([innerHeight, 0]);

  // Scale the accessor fuctions
  const xAccessorScaled: AccessorFn = d => xScale(xAccessor(d));
  const povitivityAccessorScaled: AccessorFn = d =>
    yScale(povitivityAccessor(d));
  const povitivity7DayAccessorScaled: AccessorFn = d =>
    yScale(povitivity7DayAccessor(d));

  const xTickFormatter = timeFormat('%B');
  const yTickFormatter = format('.0%');

  return (
    <ChartResizeObserver
      dimensions={{ margin, height, innerHeight, width, innerWidth }}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
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
          label={'Positivity Rate (percentage on a log scale)'}
          formatTick={yTickFormatter}
        />
        <MultiLineLight
          data={chart}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={povitivityAccessorScaled}
        />
        <MultiLine
          data={chart}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={povitivity7DayAccessorScaled}
        />
      </g>
    </ChartResizeObserver>
  );
};

export default MultiLineChart;
