import { useEffect, useRef, useState } from "react";

/* eslint-disable react-refresh/only-export-components */
const TRANSLATE = 400;

const useHorizontalScroll = (data) => {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      const edge = containerRef.current?.scrollWidth;
      const width = containerRef.current?.clientWidth;

      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate < edge - width);
    };

    const handleResize = () => {
      const edge = containerRef.current?.scrollWidth;
      const width = containerRef.current?.clientWidth;

      if (translate > edge - width) {
        setTranslate(edge - width);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateVisibility();
      handleResize();
    });

    const currentContainer = containerRef.current;
    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    updateVisibility();

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, [translate, data]);

  const slideRight = () => {
    setTranslate((prev) => {
      const newValue = prev + TRANSLATE;
      const edge = containerRef.current.scrollWidth;
      const width = containerRef.current.clientWidth;

      return newValue > edge - width ? edge - width : newValue;
    });
  };

  const slideLeft = () => {
    setTranslate((prev) => {
      const newValue = prev - TRANSLATE;
      return newValue < 0 ? 0 : newValue;
    });
  };
  return {
    translate,
    isLeftVisible,
    isRightVisible,
    containerRef,
    slideRight,
    slideLeft,
  };
};

export default useHorizontalScroll;
