import React, { useContext } from 'react';
import * as d3 from 'd3';

import { Dimensions } from '../../typings/types';
import { useChartDimensions } from './Chart';

type DefaultAxisProps<C extends 'x' | 'y', P> = {
  dimension: C;
} & P;

type AxisProps<C extends 'x' | 'y'> = DefaultAxisProps<
  C,
  C extends 'x'
    ? Omit<AxisHorizontalProps, 'dimensions'>
    : Omit<AxisVerticalProps, 'dimensions'>
>;

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
} as const;

const Axis = <C extends 'x' | 'y'>({
  dimension,
  // children,
  ...props
}: AxisProps<C>) => {
  const dimensions = useChartDimensions();

  if (dimension === 'x') {
    let p = props as Omit<AxisHorizontalProps, 'dimensions'>;
    return <AxisHorizontal dimensions={dimensions} {...p} />;
  } else if (dimension === 'y') {
    let p = props as Omit<AxisVerticalProps, 'dimensions'>;
    return <AxisVertical dimensions={dimensions} {...p} />;
  }

  return null;
};

export default Axis;

type AxisHorizontalProps = {
  dimensions: Dimensions;
  label?: string;
  formatTick?: (date: Date) => string;
  scale:
    | d3.ScaleTime<number, number, never>
    | d3.ScaleLinear<number, number, never>;
};

export function AxisHorizontal({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: AxisHorizontalProps) {
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
  dimensions: Dimensions;
  label?: string;
  scale: d3.ScaleLinear<number, number, never>;
};

export function AxisVertical({
  dimensions,
  label,
  scale,
  ...props
}: AxisVerticalProps) {
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
