import React from 'react';

import useData from './hooks/useData';
import useResizeObserver from './hooks/useResizeObserverCM';

import MultiLineChart from './components/MultiLineChart';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import './styles.css';
import ChartContainer from './components/ChartContainer';

const App = () => {
  const [data, processedData] = useData();

  const titleText = 'COVID Test Positivity Resutls';
  const descText =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quasi fugit voluptatem soluta, sapiente quae corporis earum quas officia aspernatur, deserunt repellat blanditiis corrupti, dolorem dolor dignissimos! In, iusto deleniti.';
  const dataSource = 'Helix';

  return (
    <DashboardContainer>
      <ChartContainer
        chartHeight={400}
        title={titleText}
        description={descText}
        chartType={'multi-line'}
        data={{ data, processedData }}
        source={dataSource}
      ></ChartContainer>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #e9e9e9;
`;

export default App;
