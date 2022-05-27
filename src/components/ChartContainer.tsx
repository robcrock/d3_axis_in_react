import React from 'react';
import styled from 'styled-components';
import useResizeObserver from '../hooks/useResizeObserver';
import { DataRecord } from '../typings/types';
import Footer from './Meta/Footer';
import MultiLineChart from './MultiLineChart';

type ChartContainerProps = {
  chartHeight: number;
  title?: string;
  description?: string;
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

  return (
    <Wrapper ref={chartWrapperRef}>
      <Header>
        <h1>{title}</h1>
        <p>{description}</p>
      </Header>
      <MultiLineChart
        dataFilePath={'/data/positivity_by_time_with_avg.tsv'}
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
  padding: 2rem;
  box-shadow: 5px 15px 46px rgba(0, 0, 0, 0.149966);
  backdrop-filter: blur(27.1828px);
  border-radius: 3px;
`;

const Header = styled.header`
  p {
    margin-top: 0.5rem;
  }
`;

export default ChartContainer;
