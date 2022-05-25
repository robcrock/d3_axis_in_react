import React from 'react';
import styled from 'styled-components';
import useResizeObserver from '../hooks/useResizeObserverNew';
import MultiLineChart from './MultiLineChart';

const ChartContainer = ({
  chartHeight,
  title,
  description,
  chartType,
  data,
  source,
}) => {
  const chartWrapperRef = React.useRef(null);
  const chartWrapperDimensions = useResizeObserver(chartWrapperRef);

  console.log('Chart wrapper dims ', chartWrapperDimensions);
  const { data: fullData, processedData } = data;

  return (
    <Wrapper ref={chartWrapperRef}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <MultiLineChart
        data={fullData}
        processedData={processedData}
        width={chartWrapperDimensions.width}
        height={chartHeight}
      />
      <footer>{source}</footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: white;
  margin: 1rem;
  padding: 1rem;
`;

export default ChartContainer;
