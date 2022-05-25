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
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quasi fugit voluptatem soluta, sapiente quae corporis earum quas officia aspernatur, deserunt repellat blanditiis corrupti, dolorem dolor dignissimos! In, iusto deleniti. ';
  const dataSource = { name: 'Helix', link: 'helix.com' };

  return (
    <div>
      <ChartContainer
        chartHeight={600}
        title={titleText}
        description={descText}
        chartType={'multi-line'}
        data={{ data, processedData }}
        source={dataSource}
      ></ChartContainer>
      <GlobalStyles />
    </div>
  );
};

export default App;
