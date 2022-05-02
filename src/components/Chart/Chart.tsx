import React, { createContext, useContext } from 'react';

import './Chart.css';

export const useChartDimensions = () => {};

type ChartProps = {
  dimensions: any;
  children: React.ReactChildren;
};

const Chart: React.FunctionComponent<ChartProps> = ({
  dimensions,
  children,
}) => <svg className='Chart'>{children}</svg>;

export default Chart;
