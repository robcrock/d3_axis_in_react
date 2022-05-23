import React, { useEffect, useState } from 'react';
import { json } from 'd3';

import { DataRecord, AccessorFn } from './typings/types';
// import { getTimelineData } from '../public/data/dummyData';

import LineChart from './components/LineChart';

import './styles.css';

// Define accessor functions
const dateAccessor: AccessorFn = d => new Date(d.date);
const temperatureAccessor: AccessorFn = d => d.temperatureMax;

// type GetDataType = () => { [k: string]: DataRecord[] };
// const getData: GetDataType = () => ({
//   timeline: getTimelineData(),
// });

const App = () => {
  // TODO: Why do I need to pass in an empty array here?
  const [data, setData] = useState<DataRecord[] | null>([]);

  useEffect(() => {
    // Declare data fecthing function
    // Learned to type this function here https://blog.logrocket.com/async-await-in-typescript/
    const fetchData = async () => {
      try {
        const data: DataRecord[] | undefined = await json(
          '/data/my_weather_data.json',
        );
        data && setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      <h1>Weather Dashboard</h1>
      <div className='App__charts'>
        {data ? (
          <LineChart
            data={data}
            xAccessor={dateAccessor}
            yAccessor={temperatureAccessor}
            label='Maximum Temperature'
          />
        ) : null}
      </div>
    </div>
  );
};

export default App;

// // Documented in usehooks-ts https://usehooks-ts.com/react-hook/use-interval
// function useInterval(callback: () => void, delay: number | null) {
//   const savedCallback = useRef(callback);

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     // Don't schedule if no delay is specified.
//     // Note: 0 is a valid value for delay.
//     if (!delay && delay !== 0) {
//       return;
//     }

//     const id = setInterval(() => savedCallback.current(), delay);

//     return () => clearInterval(id);
//   }, [delay]);
// }
