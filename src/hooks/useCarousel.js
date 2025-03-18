import { useEffect, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

const useCarousel = (items, translateInterval) => {
  const [current, setCurrent] = useState(0);

  const [height, setHeight] = useState(null);
  const currentRef = useRef(null);

  useEffect(() => {
    if (current === items.length) {
      setCurrent(0);
    } else if (current < 0) {
      setCurrent(items.length - 1);
    }
  }, [current, items]);

  useEffect(() => {
    if (currentRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setHeight(entry.contentRect.height);
        }
      });

      observer.observe(currentRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [current]);

  useInterval(() => {
    setCurrent((prev) => prev + 1);
  }, translateInterval);

  const back = () => setCurrent((prev) => prev - 1);
  const next = () => setCurrent((prev) => prev + 1);
  const changeCurrent = (index) => setCurrent(index);

  return {
    current,
    height,
    back,
    next,
    changeCurrent,
    currentRef,
  };
};

export default useCarousel;
