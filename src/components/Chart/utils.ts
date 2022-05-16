import { useEffect, useState, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Dimensions } from '../../typings/types';

export const callAccessor = (accessor: any, d: any, i: number) =>
  typeof accessor === 'function' ? accessor(d, i) : accessor;

export const combineChartDimensions = (dimensions: Dimensions) => {
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

export const useChartDimensions = (
  passedSettings: Dimensions,
): [React.MutableRefObject<null>, Dimensions] => {
  const ref = useRef(null);
  const dimensions = combineChartDimensions(passedSettings);

  const [width, changeWidth] = useState(0);
  const [height, changeHeight] = useState(0);

  useEffect((): void | any => {
    // We'll ignore the resize observer when width and height have been set.
    if (dimensions.width && dimensions.height) return [ref, dimensions];

    const element = ref.current;

    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      // This means we only care about the first element resizing
      const entry = entries[0];

      if (width !== entry.contentRect.width) {
        console.log('Width changed');
        changeWidth(entry.contentRect.width);
      }
      if (height !== entry.contentRect.height) {
        console.log('Height changed');
        changeHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(element!);

    return () => resizeObserver.unobserve(element!);
  }, [passedSettings, height, width, dimensions]);

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newSettings];
};

let lastId = 0;
export const useUniqueId = (prefix = '') => {
  lastId++;
  return [prefix, lastId].join('-');
};
