import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { dimensionsPropsType } from './utils';
import { useChartDimensions } from './Chart';

type AxisComponentsByDimensionType = {
  x: ({
    dimensions,
    label,
    formatTick,
    scale,
    ...props
  }: AxisHorizontalProps) => JSX.Element;
  y: ({
    dimensions,
    label,
    formatTick,
    scale,
    ...props
  }: AxisVerticalProps) => JSX.Element;
};

const axisComponentsByDimension: AxisComponentsByDimensionType = {
  x: AxisHorizontal,
  y: AxisVertical,
};

type AxisProps = {
  dimension: string;
};

const Axis: React.FunctionComponent<AxisProps> = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions();
  const Component: React.FunctionComponent<
    AxisHorizontalProps | AxisVerticalProps
  > =
    axisComponentsByDimension[dimension as keyof AxisComponentsByDimensionType];
  if (!Component) return null;

  return <Component dimensions={dimensions} {...props} />;
};

export default Axis;

type AxisHorizontalProps = {
  dimensions: any;
  label: any;
  formatTick: any;
  scale: any;
};

function AxisHorizontal({
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

      {ticks.map((tick: React.Key | null | undefined, i: any) => (
        <text
          key={tick}
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

type AxisVerticalProps = {
  dimensions: any;
  label: any;
  formatTick: any;
  scale: any;
};

function AxisVertical({
  dimensions,
  label,
  formatTick,
  scale,
  ...props
}: AxisVerticalProps) {
  const numberOfTicks = dimensions.boundedHeight / 70;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className='Axis AxisVertical' {...props}>
      <line className='Axis__line' y2={dimensions.boundedHeight} />

      {ticks.map((tick: React.Key | null | undefined, i: any) => (
        <text
          key={tick}
          className='Axis__tick'
          transform={`translate(-16, ${scale(tick)})`}
        >
          {formatTick(tick)}
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
