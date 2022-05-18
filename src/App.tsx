import React, { useEffect, useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from './utils/dummyData';
import { Record } from './typings/types';

const dateAccessor = (d: Record) => d.date;
const temperatureAccessor = (d: Record) => d.temperature;

const App = () => {
  const [data, setData] = useState(getTimelineData());

  useEffect(() => {
    console.log(getTimelineData());
    setData(getTimelineData());
  }, []);

  return (
    <>
      <Timeline
        data={data}
        xAccessor={dateAccessor}
        yAccessor={temperatureAccessor}
        label='Temperature'
      />
    </>
  );
};

export default App;
