import { useContext } from 'react';
import { ChartContext } from '../components/Chart/ChartProvider';

const useChartContext = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error(`useChartContext must be used within the ChartProvider`);
  }
  return context;
};

export default useChartContext;
