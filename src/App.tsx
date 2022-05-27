import React from 'react';

import useData from './hooks/useData';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ChartContainer from './components/ChartContainer';

const App = () => {
  const titleText =
    'Flu A positivity is much lower than Covid positivity, but both are currently increasing';
  const descText = '';
  const dataSource = { name: 'Helix', link: 'https://www.helix.com/' };

  return (
    <div>
      <ChartContainer
        title={titleText}
        description={descText}
        source={dataSource}
        chartHeight={500}
      ></ChartContainer>
      <GlobalStyles />
    </div>
  );
};

export default App;
