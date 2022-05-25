import React from 'react';
import styled from 'styled-components';
import useResizeObserver from '../hooks/useResizeObserver';
import { DataRecord } from '../typings/types';
import Footer from './Meta/Footer';
import MultiLineChart from './MultiLineChart';

type ChartContainerProps = {
  chartHeight: number;
  title: string;
  description: string;
  chartType?: string;
  data: { data: DataRecord[]; processedData: DataRecord[] };
  source: { name: string; link: string };
};

const ChartContainer = ({
  chartHeight,
  title,
  description,
  chartType,
  data,
  source,
}: ChartContainerProps) => {
  const chartWrapperRef = React.useRef(null);
  const chartWrapperDimensions = useResizeObserver(chartWrapperRef);

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
      <Footer by={source.name} source={source.link} />
    </Wrapper>
  );
};

const Wrapper = styled.figure`
  min-height: 100%;
  background: #ffffff;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 5px 15px 46px rgba(0, 0, 0, 0.149966);
  backdrop-filter: blur(27.1828px);
  border-radius: 3px;
`;

export default ChartContainer;
