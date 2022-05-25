import React, { forwardRef, useRef } from 'react';
import { extent, scaleLinear, timeFormat, format } from 'd3';
import { DataRecord, AccessorFn } from '../typings/types';

import MultiLine from './Chart/MultiLine';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';

import styled from 'styled-components';
import ChartResizeObserver from './ChartResizeObserver';

type LineChartProps<Data extends DataRecord> = {
  data: DataRecord[] | null;
  processedData: DataRecord[] | null;
  width: number;
  height: number;
};

// const ContainerResizeObserver = Component => props => {
//   const ref = useRef(null);
//   const sizes = useResizeObserver(ref);
//   return (
//     <div
//       ref={ref}
//       style={{
//         height: sizes.height || props.height,
//         width: sizes.width || props.width,
//       }}
//     >
//       <Component {...props} />
//     </div>
//   );
// };

const MultiLineChart = <Data extends DataRecord>({
  data,
  processedData,
  width,
  height,
}: LineChartProps<Data>) => {
  // const ref = React.useRef(null);
  // const dimensions = useResizeObserver(ref);

  if (!processedData || !data) return <div style={{ width, height }} />;
  // console.log(data);

  // Margin Convention
  const margin = { top: 20, right: 200, bottom: 60, left: 80 };
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

  console.table('dimensions spread ', {
    margin,
    height,
    innerHeight,
    width,
    innerWidth,
  });
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
