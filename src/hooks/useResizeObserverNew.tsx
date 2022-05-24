import { useLayoutEffect, useState } from 'react';

const useResizeObserver = (ref: { current: any }) => {
  const [{ width, height }, setWidthHeight] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const divNode = ref.current;
    if (divNode == null) return;

    console.log('divNode ', divNode.current);

    // create a resize observer
    const observer = new ResizeObserver(entries => {
      if (!entries.length) return;

      // on resize, update our internal state with the latest values
      const { width, height } = entries[0].contentRect;

      console.log('contentRect ', entries[0].contentRect);
      setWidthHeight({ width, height });
    });

    // observe our container node
    observer.observe(divNode);

    // cleanup
    return () => {
      observer.unobserve(divNode);
    };
  }, [ref]);

  return { width, height };
};

export default useResizeObserver;
