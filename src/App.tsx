import React, { useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from './utils/dummyData';
import { Data } from './typings/types';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: Data) => parseDate(d.date);
const temperatureAccessor = (d: Data) => parseFloat(d.temperature);

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState(getData());

  console.log(JSON.stringify(data.timeline));

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
