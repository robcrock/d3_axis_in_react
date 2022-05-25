import React from 'react';

import useData from './hooks/useData';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ChartContainer from './components/ChartContainer';

const App = () => {
  const [data, processedData] = useData();

  const titleText = 'COVID Test Positivity Results';
  const descText =
    'Covid+Flu tests are typically ordered for patients who present with symptoms. This is not the case with Covid-only test orders. The Covid+Flu positivity rate is therefore a proxy for symptomatic positivity.';
  const dataSource = { name: 'Helix', link: 'helix.com' };

  return (
    <div>
      <ChartContainer
        title={titleText}
        description={descText}
        source={dataSource}
        chartHeight={400}
        data={{ data, processedData }}
      ></ChartContainer>
      <GlobalStyles />
    </div>
  );
};

export default App;
