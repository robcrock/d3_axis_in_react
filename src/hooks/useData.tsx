import { useEffect, useState } from 'react';
import { json, csv, tsv } from 'd3';

import { DataRecord } from '../typings/types';

type useDataProps = {
  url: string;
  fileType: 'csv' | 'tsv' | 'json';
};

const fileParser = async (url: string, fileType: 'csv' | 'tsv' | 'json') => {
  let data = [];
  try {
    switch (fileType) {
      case 'csv':
        return (data = await csv(url));
      case 'tsv':
        return (data = await tsv(url));
      case 'json':
        return (data = await json(url));
    }
  } catch (error) {
    console.error(error);
  }
};

const useData = (url, fileType) => {
  const [data, setData] = useState<unknown | null>([]);

  useEffect(() => {
    // Declare data fecthing function
    // Learned to type this function here https://blog.logrocket.com/async-await-in-typescript/
    const data = fileParser(url, fileType);
    console.log(data);
    data && setData(data);
    console.log('Inside effect');
  }, []);

  console.log('Data ', data);
  return data;
};

export default useData;
