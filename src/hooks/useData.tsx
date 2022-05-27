import { autoType, group, tsv } from 'd3';
import { useEffect, useState } from 'react';
import { DataRecord } from '../typings/types';

const useData = () => {
  const [data, setData] = useState<DataRecord[] | null>([]);

  // Transform data function
  const createTransformData = dataSet => {
    // Filter the dataset
    const filteredData = Array.from(dataSet).filter(
      d => d.test_ordered === 'COVID only test',
    );

    // Transform data
    const covidP = filteredData.map(d => {
      return {
        date: d.collection_date,
        dimension: 'covid_positivity',
        value: d.covid_positivity,
      };
    });

    const flueP = filteredData.map(d => {
      return {
        date: d.collection_date,
        dimension: 'flu_positivity',
        value: d.flua_positivity,
      };
    });

    const transformedData = covidP.concat(flueP);

    return transformedData;
  };

  // Chart data function
  const createChartData = dataSet => {
    const groupedData = Array.from(group(dataSet, d => d.dimension));

    // Sort for presentation, as D3 doesn't sort our data for us.
    groupedData.forEach(group => group[1].sort((a, b) => a.date - b.date));

    return groupedData;
  };

  // Fetch the initial dataset
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tsv(
          '/data/positivity_by_test_ordered_time.tsv',
          autoType,
        );
        const transformedData = createTransformData(data);
        const chartData = createChartData(transformedData);
        console.log('chataData', chartData);

        const dataState = {
          original: data,
          transformed: transformedData,
          chart: chartData,
        };

        setData(dataState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return [data];
};

export default useData;
