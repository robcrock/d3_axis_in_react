import { autoType, group, tsv } from 'd3';
import { chunk, groupBy, union, partition } from 'lodash';
import { useEffect, useState } from 'react';
import { DataRecord } from '../typings/types';

const useData = () => {
  const [data, setData] = useState<DataRecord[] | null>([]);
  const [processedData, setProcessedData] = useState<DataRecord[] | null>([]);

  // Fetch the initial dataset
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: DataRecord[] | undefined = await tsv(
          '/data/positivity_by_test_ordered_time.tsv',
          autoType,
        );

        console.log(data);
        console.log('Count before filter: ', data.length);

        // Filter first to reduce the number of records you need to process
        const filteredData = data?.filter(
          d => d.test_ordered === 'COVID only test',
        );

        console.log('Count after filter: ', filteredData.length);

        // Sort for presentation, as D3 doesn't sort our data for us.
        const sortedData = filteredData.sort(
          (a, b) => a.collection_date - b.collection_date,
        );

        // Transform data
        const covidP = sortedData.map(d => {
          return {
            date: d.collection_date,
            dimension: 'covid_positivity',
            value: d.covid_positivity,
          };
        });

        const flueP = sortedData.map(d => {
          return {
            date: d.collection_date,
            dimension: 'flu_positivity',
            value: d.flua_positivity,
          };
        });

        data && setData(covidP.concat(flueP));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Process the dataset after it has been fetched
  useEffect(() => {
    if (!data) return;

    const groupedData = Array.from(group(data, d => d.dimension));

    // Sort for presentation, as D3 doesn't sort our data for us.
    groupedData.forEach(group => group[1].sort((a, b) => a.date - b.date));

    setProcessedData(groupedData);
  }, [data]);

  return [data, processedData];
};

export default useData;
