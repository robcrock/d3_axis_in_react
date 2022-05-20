import React, { useEffect, useRef, useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from '../public/data/dummyData';
import { DataRecord } from './typings/types';

import './styles.css';

const dateAccessor = (d: DataRecord) => d.date;
const temperatureAccessor = (d: DataRecord) => d.temperature;

type GetDataType = () => { [property: string]: DataRecord[] };
const getData: GetDataType = () => ({
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

// Documented in usehooks-ts https://usehooks-ts.com/react-hook/use-interval
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}
