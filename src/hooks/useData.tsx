import { autoType, group, tsv } from 'd3';
import { useEffect, useState } from 'react';
import { DataRecord } from '../typings/types';

const useData = filePath => {
  const [data, setData] = useState<DataRecord[] | null>([]);

  // Transform data function
  const createTransformData = dataSet => {
    // Filter the dataset
    const filteredData = Array.from(dataSet).filter(
      d => d.positivity_7day !== null,
    );

    const stageData = filteredData.map(d => {
      return {
        date: d.collection_date,
        test: d.license_assessment,
        positivity: d.positivity,
        positivity_7_day_avg: d.positivity_7day,
      };
    });

    return stageData;
  };

  // Chart data function
  const createChartData = dataSet => {
    const groupedData = Array.from(group(dataSet, d => d.test));

    // Sort for presentation, as D3 doesn't sort our data for us.
    groupedData.forEach(group => group[1].sort((a, b) => a.date - b.date));

    return groupedData;
  };

  // Fetch the initial dataset
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await tsv(filePath, autoType);
        const transformedData = createTransformData(data);
        const chartData = createChartData(transformedData);

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
