import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import * as d3 from 'd3';

import { DimensionProps } from '../../typings/types';
import { useChartDimensions } from '../utils';

const defaulSetting: DimensionProps = {
  height: 600,
  width: 700,
  marginTop: 40,
  marginRight: 30,
  marginBottom: 40,
  marginLeft: 75,
  boundedHeight: 0,
  boundedWidth: 0,
};

type AxisProps<T extends ElementType = 'g'> = {
  dimension?: 'x' | 'y';
  children: ReactNode;
};

const axisComponentsByDimension = {
  x: AxisHorizontal,
  // y: AxisVertical,
};

const Axis = <T extends ElementType = 'g'>({ dimension, ...props }: AxisProps<T> & ComponentPropsWithoutRef<T> => {
  const dimensions = useChartDimensions(defaulSetting);
  const Component = AxisHorizontal;

  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

export default Axis;

type AxisHorizontalProps = {
  dimensions: DimensionProps;
  label: string;
  formatTick: (date: Date) => string;
  scale: d3.ScaleTime<number, number, never>;
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

      {ticks.map((tick, i) => (
        <text
          key={i}
          className='Axis__tick'
          transform={`translate(${scale(tick)}, 25)`}
        >
          {formatTick(tick)}
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
