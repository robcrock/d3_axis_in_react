import React from 'react';

import useData from './hooks/useData';
import useResizeObserver from './hooks/useResizeObserverNew';

import MultiLineChart from './components/MultiLineChart';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import './styles.css';

const App = () => {
  const ref = React.useRef(null);
  const { width, height } = useResizeObserver(ref);

  const [data, processedData] = useData();

  return (
    <>
      <ChartWrapper ref={ref}>
        <DashboardTitle>COVID Test Povitivity Results</DashboardTitle>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          quasi fugit voluptatem soluta, sapiente quae corporis earum quas
          officia aspernatur, deserunt repellat blanditiis corrupti, dolorem
          dolor dignissimos! In, iusto deleniti.
        </p>
        <MultiLineChart
          data={data}
          processedData={processedData}
          width={width}
          height={height * 0.75}
        />
        <footer>Dummy Footer</footer>
      </ChartWrapper>
    </>
  );
};

const DashboardTitle = styled.div`
  font-weight: 900;
  margin: 0.4em 0 0.6em;
`;

const ChartWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: white;
  margin: 1rem;
  padding: 1rem;
`;

export default App;
