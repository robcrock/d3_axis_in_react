import React from 'react';
import { scaleTime, extent, scaleLinear, timeFormat, format } from 'd3';

import { DataRecord, AccessorFn } from '../typings/types';
import useResizeObserver from '../hooks/useResizeObserver';

import './Chart/Chart.css';

import ChartProvider from './Chart/ChartProvider';
import MultiLine from './Chart/MultiLine';
import AxisHorizontal from './Chart/AxisHorizontal';
import AxisVertical from './Chart/AxisVertical';
import { groupBy } from 'lodash';

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
    marginTop: 20,
    marginRight: 200,
    marginBottom: 120,
    marginLeft: 80,
    height: 0,
    width: 0,
    innerHeight: 0,
    innerWidth: 0,
  });

  //********** BEGIN DATA PROCESSING **********
  // Filter the data prior to creating your scales
  const filteredData = data.filter(
    d => d.test_ordered === 'COVID only test' || 'COVID+Flu test',
  );

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

  const sortedData = filteredData.sort(
    (a, b) => a.collection_date - b.collection_date,
  );

  //********** FINISH DATA PROCESSING **********
  const dataToGroup = groupBy(sortedData, 'test_ordered');
  const groupedData = Object.keys(dataToGroup).map(function (key) {
    return dataToGroup[key];
  });

  console.log(groupedData);

  // Create formatting functions for the axes
  const formatDate = timeFormat('%-m/%d');
  const formatNumber = format('.0%');

  return (
    <div className='Timeline' ref={wrapperRef}>
      <h2>COVID Positivity Rate by Tests Ordered</h2>
      <ChartProvider data={groupedData} dimensions={dimensions}>
        <AxisHorizontal scale={xScale} formatTick={formatDate} />
        <AxisVertical scale={yScale} label={label} formatTick={formatNumber} />
        <MultiLine
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
        />
        ;
      </ChartProvider>
    </div>
  );
};

export default LineChart;
