/* eslint-disable react/jsx-props-no-spreading */

import * as d3 from 'd3';

import { DimensionsInterface } from './GraphInterfaces';

// import { useWrapperDimensions } from './Wrapper';

interface AxisBottomProps {
  dms: DimensionsInterface;

  props: any;

  scale: any;
}

interface AxisProps {
  dimension: string;

  dms: DimensionsInterface;

  props: any;

  scale: any;
}

const axisComponentDimensions = {
  x: AxisBottom,

  //   y: AxisLeft,
};

export default function Axis({ dimension, dms, ...props }: AxisProps) {
  // const dms = useWrapperDimensions();

  const Component = axisComponentDimensions[dimension];

  if (!Component) return null;

  return <Component dms={dms} {...props} />;
}

export function AxisBottom({ dms, scale, ...props }: AxisBottomProps) {
  const numberOfTicks =
    dms.boundedWidth < 600 ? dms.boundedWidth / 50 : dms.boundedWidth / 150;

  const ticks = scale.ticks(numberOfTicks);

  return (
    <g className="axis-bottom" {...props}>
      <line className="axis-line" x2={dms.boundedWidth} />

      {ticks.map(tick => (
        <text
          className="tick"
          key={tick}
          transform={`translate(${scale(tick)}, 25)`}
        >
          {tick}
        </text>
      ))}

      {/* <text

        className="axis-label"

        transform={`translate(${dms.boundedWidth / 2}, 60)`}

      >

        label

      </text> */}
    </g>
  );
}
