import { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions } from '../typings/types';

const combineChartDimensions = (dimensions: Dimensions) => {
  let parsedDimensions = {
    ...dimensions,
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
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
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      setDimensions;
    });

    resizeObserver.observe(observeTarget!);

    return () => {
      resizeObserver.unobserve(observeTarget!);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
