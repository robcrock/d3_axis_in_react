import React from 'react';

type LineProps = {
  type: any;
  data: any;
  xAccessor: any;
  yAccessor: any;
  y0Accessor: any;
  interpolation: any;
};

const Line: React.FunctionComponent<LineProps> = ({
  type,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation,
  ...props
}) => {
  return <path {...props} className={`Line Line--type-${type}`} />;
};

export default Line;
