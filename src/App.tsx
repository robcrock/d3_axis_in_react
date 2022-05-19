import React, { useEffect, useState } from 'react';
import Timeline from './components/Timeline';
import * as d3 from 'd3';
import { getTimelineData } from '../public/data/dummyData';
import { Record } from './typings/types';

const dateAccessor = (d: Record) => d.date;
const averageTemperatureAccessor = (d: Record) => d.avg_temp_F;
const temperatureAccessor = (d: Record) => d.temperature;
const precipitationAccessor = (d: Record) => d.total_precip_in;

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('/data/weekly_temperature.csv', d3.autoType)
      .then(d => {
        setData(d);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Timeline
        data={data}
        xAccessor={dateAccessor}
        yAccessor={averageTemperatureAccessor}
        label='Average Temperature'
      />
    </>
  );
};

export default App;
