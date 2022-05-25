import React from 'react';

import MultiLineChart from './components/MultiLineChart';
import useResizeObserver from './hooks/useResizeObserverNew';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import './styles.css';
import useData from './hooks/useData';

const ChartWrapper = styled.div`
  min-height: 500px;
  width: 100%;
  width: calc(100% + 1em);
  background: white;
  padding: 1rem;
`;

const App = () => {
  const ref = React.useRef(null);
  const { width, height } = useResizeObserver(ref);

  const [data, processedData] = useData();

  return (
    <ChartWrapper className='App' ref={ref}>
      <h2>COVID Test Povitivity Results</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        quasi fugit voluptatem soluta, sapiente quae corporis earum quas officia
        aspernatur, deserunt repellat blanditiis corrupti, dolorem dolor
        dignissimos! In, iusto deleniti.
      </p>
      <MultiLineChart
        data={data}
        processedData={processedData}
        width={width}
        height={height * 0.65}
      />
      <footer>Dummy Footer</footer>
    </ChartWrapper>
  );
};

export default App;
