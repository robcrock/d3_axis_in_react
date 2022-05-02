import React, { useState, useEffect, useRef } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import * as d3 from 'd3';
import Timeline from './components/Timeline';
import { getTimelineData } from './utils/dummyData';

import './styles.css';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: any) => parseDate(d.date);
const temperatureAccessor = (d: any) => d.temperature;

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState(getData());

  console.log(data.timeline);

  return (
    <React.Fragment>
      <GlobalStyles />
      <div className='App'>
        <div className='App__charts'>
          <Timeline
            data={data.timeline}
            xAccessor={dateAccessor}
            yAccessor={temperatureAccessor}
            label='Temperature'
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
