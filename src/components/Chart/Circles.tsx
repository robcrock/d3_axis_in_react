import React from 'react';
import { Record } from '../../typings/types';

type CirclesProps = {
  data: Record[];
  keyAccessor: () => number;
  xAccessor: () => number;
  yAccessor: () => number;
  radius: () => number | number;
};

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius = 5,
}: CirclesProps) => {
  return (
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
};

export default Circles;
