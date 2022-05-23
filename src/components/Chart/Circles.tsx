import React from 'react';
import { DataRecord, AccessorFn } from '../../typings/types';

type CirclesProps = {
  data: DataRecord[];
  keyAccessor: AccessorFn;
  xAccessor: AccessorFn;
  yAccessor: AccessorFn;
  radius?: AccessorFn | number;
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
          key={keyAccessor(d)}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={typeof radius == 'function' ? radius(d) : radius}
        />
      ))}
    </React.Fragment>
  );
};

export default Circles;
