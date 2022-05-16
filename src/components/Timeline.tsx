import * as d3 from 'd3';
import React, { useContext, useEffect, useRef } from 'react';

import Chart from './Chart/Chart';
import './Chart/Chart.css';
import Axis from './Chart/Axis';
import useResizeObserver from '../hooks/useResizeObserver';
import { Dimensions, D } from '../typings/types';

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
  // const [ref, dimensions] = useChartDimensions();
  const wrapperRef: React.MutableRefObject<null> = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  // console.log('Dimensions ', dimensions);

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
          <AxisHorizontal
            label={'Date'}
            scale={xScale}
            formatTick={formatDate}
          />
          <AxisVertical label={'Temperature'} scale={yScale} />
        </Chart>
      </DimensionContext.Provider>
    </div>
  );
};

export default Timeline;

type AxisHorizontalProps = {
  label?: string;
  formatTick?: (date: Date) => string;
  scale:
    | d3.ScaleTime<number, number, never>
    | d3.ScaleLinear<number, number, never>;
};

export function AxisHorizontal({
  label,
  formatTick,
  scale,
  ...props
}: AxisHorizontalProps) {
  const dimensions = useContext(DimensionContext);

  const numberOfTicks =
    dimensions.boundedWidth < 600
      ? dimensions.boundedWidth / 100
      : dimensions.boundedWidth / 250;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g
      className='Axis AxisHorizontal'
      transform={`translate(0, ${dimensions.boundedHeight})`}
      {...props}
    >
      <line className='Axis__line' x2={dimensions.boundedWidth} />

      {ticks?.map((tick, i) => (
        <text
          key={i}
          className='Axis__tick'
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick?.(tick as Date)}
        </text>
      ))}

      {label && (
        <text
          className='Axis__label'
          transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
        >
          {label}
        </text>
      )}
    </g>
  );
}

type AxisVerticalProps = {
  label?: string;
  scale: d3.ScaleLinear<number, number, never>;
};

export function AxisVertical({ label, scale, ...props }: AxisVerticalProps) {
  const dimensions = useContext(DimensionContext);

  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className='Axis AxisVertical' {...props}>
      <line className='Axis__line' y2={dimensions.boundedHeight} />

      {ticks.map((tick, i) => (
        <text
          key={i}
          className='Axis__tick'
          transform={`translate(-16, ${scale(tick)})`}
        >
          {tick}
        </text>
      ))}

      {label && (
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
      )}
    </g>
  );
}
