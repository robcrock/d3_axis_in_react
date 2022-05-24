import ResizeObserver from 'resize-observer-polyfill';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
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
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
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
  const [observerEntry, setObserverEntry] = useState({});
  const [node, setNode] = useState(null);
  // const observer = useRef<SVGSVGElement | null>(null);
  const observer = useRef(null);

  console.log('node ', node);

  const disconnect = useCallback(() => observer.current?.disconnect(), []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entry]) => setObserverEntry(entry));
    console.log('observer current ', observer.current);
    if (node) observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  console.log('observerEntry ', observerEntry);

  return [setNode, observerEntry];

  // const disconnect = useCallback(() => observer.current?.disconnect(), []);

  // const dimensions = applyMarginConvention(marginConvention);

  // const [height, setHeight] = useState(0);
  // const [width, setWidth] = useState(0);

  // useLayoutEffect(() => {
  //   if (dimensions.width && dimensions.height) return;
  //   // return [ref, dimensions];
  //   if (!ref.current) return;

  //   console.log('ref height ', ref.current.clientHeight);
  //   console.log('ref width ', ref.current.clientWidth);

  //   console.log('ref.current ', ref.current);

  //   const observeTarget = ref.current;
  //   const resizeObserver = new ResizeObserver(entries => {
  //     if (!Array.isArray(entries)) return;
  //     if (!entries.length) return;

  //     const entry = entries[0];

  //     console.log('entry rect ', entry.contentRect);

  //     if (height !== entry.contentRect.height) {
  //       setHeight(entry.contentRect.height);
  //     }
  //     if (width !== entry.contentRect.width) {
  //       setWidth(entry.contentRect.width);
  //     }
  //   });

  //   resizeObserver.observe(observeTarget);

  //   return () => {
  //     resizeObserver.unobserve(observeTarget);
  //   };
  // }, [marginConvention, height, width, dimensions]);

  // const newDimensions = applyMarginConvention({
  //   ...dimensions,
  //   width: dimensions.width || width,
  //   height: dimensions.height || height,
  // });

  // return [ref, newDimensions] as const;
};

export default useResizeObserver;
