import React from 'react';
import { DataRecord, AccessorType } from '../../typings/types';

type CirclesProps = {
  data: DataRecord[];
  keyAccessor: AccessorType;
  xAccessor: AccessorType;
  yAccessor: AccessorType;
  radius?: AccessorType | number;
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
