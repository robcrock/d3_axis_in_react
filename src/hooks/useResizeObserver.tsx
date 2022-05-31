import { useLayoutEffect, useEffect, useState } from 'react';

const useResizeObserver = (ref: { current: any }) => {
  const [{ width, height }, setWidthHeight] = useState({
    width: 0,
    height: 0,
  });

  console.log('Triggered');
  console.log('Width', width);
  console.log('Height', height);

  useEffect(() => {
    const figureNode = ref.current;
    if (figureNode === null) return;

    // create a resize observer
    const observer = new ResizeObserver(entries => {
      if (!entries.length) return;

      // on resize, update our internal state with the latest values
      const { width, height } = entries[0].contentRect;

      setWidthHeight({ width, height });
    });

    // observe our container node
    observer.observe(figureNode);

    // cleanup
    return () => {
      observer.unobserve(figureNode);
    };
  }, []);

  useLayoutEffect(() => {
    // handleResize()
    if (!ref.current) return;
    const { offsetWidth = 0, offsetHeight = 0 } = ref.current;
    setWidthHeight({
      width: offsetWidth,
      height: offsetHeight,
    });
  }, []);

  return { width, height };
};

export default useResizeObserver;
