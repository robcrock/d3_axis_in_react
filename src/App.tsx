import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Axis from './components/Chart/Axis';
import { getTimelineData } from './utils/dummyData';
import { useChartDimensions } from './components/Chart/utils';

import './styles.css';

const parseDate = d3.timeParse('%m/%d/%Y');
const dateAccessor = (d: any) => parseDate(d.date);
const temperatureAccessor = (d: any) => d.temperature;

type TypedData = {
  timeline: {
    date: string;
    temperature: number;
  }[];
};

const getData = () => ({
  timeline: getTimelineData(),
});

const App = () => {
  const [data, setData] = useState(getData());

  const formatDate = d3.timeFormat('%-b %-d');

  type TypedDimensions = {};

  return (
    <React.Fragment>
      <div className='App'>
        <div className='App__charts'>
          <Axis />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
