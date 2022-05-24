import { autoType, tsv } from 'd3';
import { groupBy } from 'lodash';
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

        data && setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Process the dataset after it has been fetched
  useEffect(() => {
    if (!data) return;

    // Filter first to reduce the number of records you need to process
    const filteredData = data?.filter(
      d => d.test_ordered === 'COVID only test' || 'COVID+Flu test',
    );

    // Sort for presentation, as D3 doesn't sort our data for us.
    const sortedData = filteredData.sort(
      (a, b) => a.collection_date - b.collection_date,
    );

    const dataToGroup = groupBy(sortedData, 'test_ordered');
    const groupedData = Object.keys(dataToGroup).map(function (key) {
      return dataToGroup[key];
    });

    setProcessedData(groupedData);
  }, [data]);

  return [data, processedData];
};

export default useData;
