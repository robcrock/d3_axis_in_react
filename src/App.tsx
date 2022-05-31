import React from 'react';

import useData from './hooks/useData';

// !IMPORTANT: Styles must be loaded last
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import ChartContainer from './components/ChartContainer';

const App = () => {
  const titleText = 'Waves of COVID and Flu A, since late last year.';
  const descText =
    'The first Flu A wave subsided with the rise of Omicron BA.1, while the second has persisted in spite of another rise in Omicron BA.2.';
  const dataSource = { name: 'Helix', link: 'https://www.helix.com/' };

  return (
    <div>
      <ChartContainer
        title={titleText}
        description={descText}
        source={dataSource}
        aspectRatio={'16:9'}
      ></ChartContainer>
      <GlobalStyles />
    </div>
  );
};

export default App;
