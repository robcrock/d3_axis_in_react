import React from 'react';
import { extent, scaleLinear, timeFormat, format } from 'd3';

import { DataRecord, AccessorFn } from '../typings/types';

import MultiLine from './Chart/MultiLine';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';
import useData from '../hooks/useData';

import styled from 'styled-components';
import useResizeObserver from '../hooks/useResizeObserverNew';

const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

type LineChartProps<Data extends DataRecord> = {
  width: number;
  height: number;
};

const LineChart = <Data extends DataRecord>({
  width = 650,
  height = 400,
}: LineChartProps<Data>) => {
  const [data, processedData] = useData();
  if (!processedData || !data) return <div style={{ width, height }} />;

  // Margin Convention
  const margin = { top: 20, right: 200, bottom: 40, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create accessor functions
  const xAccessor: AccessorFn = d => new Date(d.collection_date);
  const yAccessor: AccessorFn = d => d.covid_positivity;

  const xExtent = extent(data, xAccessor);
  const yExtent = extent(data, yAccessor);
  // const colorExtent = extent(data, colorAccessor)

  // Create scales
  const xScale = scaleLinear().domain(xExtent).range([0, innerWidth]);
  const yScale = scaleLinear().domain(yExtent).range([innerHeight, 0]);
  // const colorScale = scaleSequential(interpolateCividis).domain(colorExtent)

  // Scale the accessor fuctions
  const xAccessorScaled: AccessorFn = d => xScale(xAccessor(d));
  const yAccessorScaled: AccessorFn = d => yScale(yAccessor(d));

  const xTickFormatter = timeFormat('%-m/%d');
  const yTickFormatter = format('.0%');

  return (
    <ChartWrapper>
      <svg width={width} height={height}>
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
      </svg>
    </ChartWrapper>
  );
};

export default LineChart;
