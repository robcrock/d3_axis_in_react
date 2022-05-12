import React, { useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from './utils/dummyData';
import { D } from './typings/types';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: D) => parseDate(d.date.toString());
const temperatureAccessor = (d: D) => d.temperature;

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState(getData());

  return (
    <>
      <Timeline
        data={data.timeline}
        xAccessor={dateAccessor}
        yAccessor={temperatureAccessor}
        label='Temperature'
      />
    </>
  );
};

export default App;
