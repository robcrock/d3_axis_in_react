import { tsv, csv, json, group, autoType } from 'd3';
import { useEffect, useReducer, useRef } from 'react';

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

interface State<T> {
  data?: T;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

// See: https://usehooks-ts.com/react-hook/use-fetch
function useData<T = unknown>(
  path?: string,
  fileType: 'csv' | 'tsv' | 'json' = 'json',
  options?: RequestInit,
): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  };

  function d3Fetch(path: string, fileType: string) {
    switch (fileType) {
      case 'tsv':
        return tsv(path, autoType);
      case 'csv':
        return csv(path, autoType);
      case 'json':
        return json(path);
      default:
        return new Error(
          "We're only able to handle the csv, tsv, and json file types at this time.",
        );
    }
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        const transformedData = createTransformData(action.payload);
        const chartData = createChartData(transformedData);

        const dataState = {
          original: action.payload,
          transformed: transformedData,
          chart: chartData,
        };
        return { ...initialState, data: dataState };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    // Do nothing if the url is not given
    if (!path) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[path]) {
        dispatch({ type: 'fetched', payload: cache.current[path] });
        return;
      }

      try {
        const data = await d3Fetch(path, fileType);
        if (!data) {
          throw new Error(
            'No data was found at either that file path was found. Please check you file path and or file type and try again.',
          );
        }

        cache.current[path] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}

export default useData;
