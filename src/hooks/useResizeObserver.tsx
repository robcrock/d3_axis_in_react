import { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions } from '../typings/types';

const defaulSetting: Dimensions = {
  height: 0,
  width: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  boundedHeight: 0,
  boundedWidth: 0,
};

const combineChartDimensions = (dimensions: any) => {
  let parsedDimensions = {
    ...dimensions,
    marginTop: 40,
    marginRight: 30,
    marginBottom: 100,
    marginLeft: 75,
  };

  return {
    ...parsedDimensions,
    boundedHeight: Math.max(
      parsedDimensions.height -
        parsedDimensions.marginTop -
        parsedDimensions.marginBottom,
      0,
    ),
    boundedWidth: Math.max(
      parsedDimensions.width -
        parsedDimensions.marginLeft -
        parsedDimensions.marginRight,
      0,
    ),
  };
};

const useResizeObserver = (ref: MutableRefObject<null>) => {
  const [dimensions, setDimensions] = useState(defaulSetting);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      setDimensions(
        combineChartDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        }),
      );
    });

    resizeObserver.observe(observeTarget!);

    return () => {
      resizeObserver.unobserve(observeTarget!);
    };
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;
