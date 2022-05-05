import React, { useState, useRef } from 'react';
import * as d3 from 'd3';
import { useChartDimensions } from './utils';
import { getTimelineData } from '../../utils/dummyData';

type PassedSettingsTypes = {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
};

type TypedTimelineData = {
  date: string;
  temperature: number;
}[];
interface Data {
  [key: string]: any;
}

type xAccessorFunc = (d: any) => number | Date;

const getData = () => getTimelineData();

const passedSettings = {
  height: 900,
  width: 1400,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 20,
  marginLeft: 20,
};

const Axis = ({
  dimension = 'x',
  scale = 'scaleLinear',
  formatTick = 'd3.format(",")',
  label = 'x-axis',
  ...props
}) => {
  const [data, setData] = useState(getData());
  const [ref, dimensions] = useChartDimensions(passedSettings);

  const xAccessor: xAccessorFunc = d => new Date(d.date);

  const xDomain = d3.extent(data, d => d.date);

  console.log('Domain b ', xDomain);

  const xScale = d3
    .scaleTime()
    .domain(xDomain ? [0, 0] : [0, 0])
    .range([0, dimensions.boundedWidth]);

  console.log('Domain a ', xDomain);

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  console.log('n of ticks ', numberOfTicks);

  const ticks = xScale.ticks(numberOfTicks);

  console.log('Ticks ', ticks);

  return (
    <svg className='Chart' width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
      >
        <g className='Axis AxisVertical' {...props}>
          <line className='Axis__line' y2={dimensions.boundedHeight} />

          {ticks.map((tick, i) => (
            <text
              key={`tick-${i}`}
              className='Axis__tick'
              transform={`translate(-16, ${xScale(tick)})`}
            >
              {d3.format(',')(tick)}
            </text>
          ))}

          {/* {label && (
            <text
              className='Axis__label'
              style={{
                transform: `translate(-56px, ${
                  dimensions.boundedHeight / 2
                }px) rotate(-90deg)`,
              }}
            >
              {label}
            </text>
          )} */}
        </g>
      </g>
    </svg>
  );
};

export default Axis;
