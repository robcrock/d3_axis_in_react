import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Dimensions } from '../typings/types';

type MarginKeys = 'marginTop' | 'marginRight' | 'marginLeft' | 'marginBottom';
// Here we need to Omit a few properties so that TS doesn't compalin about
// us having redundant properties on our dimensions object.
type DimensionsWithMarginDefaults = Omit<Dimensions, MarginKeys> &
  Partial<Pick<Dimensions, MarginKeys>>;

const applyMarginConvention = (
  dimensions: DimensionsWithMarginDefaults,
): Dimensions => {
  let dimensionsWithMargin = {
    // Set up your margin convention here.
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    ...dimensions,
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

const useResizeObserver = (marginConvention: Dimensions) => {
  const ref = useRef<HTMLDivElement>(null);
  const dimensions = applyMarginConvention(marginConvention);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (dimensions.width && dimensions.height) return;
    // return [ref, dimensions];
    if (!ref.current) return;

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

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [marginConvention, height, width, dimensions]);

  const newDimensions = applyMarginConvention({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  });

  return [ref, newDimensions];
};

export default useResizeObserver;
