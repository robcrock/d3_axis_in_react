import { MutableRefObject, useEffect, useState } from 'react';
import { Dimensions } from '../typings/types';

const applyMarginConvention = (dimensions: Dimensions): Dimensions => {
  let dimensionsWithMargin = {
    ...dimensions,
    // Set up your margin convention here.
    marginTop: 40,
    marginRight: 30,
    marginBottom: 80,
    marginLeft: 75,
  };

  return {
    ...dimensionsWithMargin,
    innerHeight: Math.max(
      dimensionsWithMargin.height -
        dimensionsWithMargin.marginTop -
        dimensionsWithMargin.marginBottom,
      0,
    ),
    innerWidth: Math.max(
      dimensionsWithMargin.width -
        dimensionsWithMargin.marginLeft -
        dimensionsWithMargin.marginRight,
      0,
    ),
  };
};

const useResizeObserver = (ref: MutableRefObject<null>) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const dimensions = applyMarginConvention({
    height,
    width,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (height !== entry.contentRect.height) {
        setHeight(entry.contentRect.height);
      }
      if (width !== entry.contentRect.width) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(observeTarget!);

    return () => {
      resizeObserver.unobserve(observeTarget!);
    };
  }, [height, width]);

  const newDimensions = applyMarginConvention({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return newDimensions;
};

export default useResizeObserver;
