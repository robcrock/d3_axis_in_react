import React from 'react';
import { Record } from '../../typings/types';

type CirclesProps = {
  data: Record[];
  keyAccessor: () => number;
  xAccessor: () => number;
  yAccessor: () => number;
  radius: number;
};

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius,
}: CirclesProps) => (
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        className='Circles__circle'
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == 'function' ? radius(d) : radius}
      />
    ))}
  </React.Fragment>
);

Circles.defaultProps = {
  radius: 5,
};

export default Circles;
