import React, { useEffect, useRef, useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from '../public/data/dummyData';
import { Record } from './typings/types';

import './styles.css';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: Record) => d.date;
const averageTemperatureAccessor = (d: Record) => d.avg_temp_F;
const temperatureAccessor = (d: Record) => d.temperature;
const precipitationAccessor = (d: Record) => d.total_precip_in;

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState(getData());

  useInterval(() => {
    setData(getData());
  }, 4000);
  // useEffect(() => {
  //   d3.csv('/data/weekly_temperature.csv', d3.autoType)
  //     .then(d => {
  //       console.log('CSV Data ', d);
  //       setData(d);
  //     })
  //     .catch(console.error);
  // }, []);

  return (
    <div className='App'>
      <h1>Weather Dashboard</h1>
      <div className='App__charts'>
        <Timeline
          data={data.timeline}
          xAccessor={dateAccessor}
          yAccessor={temperatureAccessor}
          label='Average Temperature'
        />
      </div>
    </div>
  );
};

export default App;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
