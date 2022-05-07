import React, { useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from './utils/dummyData';

const formatDate = d3.timeFormat('%-b %-d');

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: any) => parseDate(d.date) ?? new Date(2022, 12);
const temperatureAccessor = (d: any) => d.temperature ?? 0;

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
