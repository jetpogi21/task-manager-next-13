import { useState, useEffect } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl";

function useScreenSize(): Size {
  const [size, setSize] = useState<Size>(getSize);

  function getSize(): Size {
    const width = window.innerWidth;
    if (width < 640) return "sm";
    if (width < 768) return "md";
    if (width < 1024) return "lg";
    if (width < 1280) return "xl";
    return "2xl";
  }

  const throttle = (func: () => void, limit: number) => {
    let inThrottle: NodeJS.Timeout | undefined;
    return function () {
      if (!inThrottle) {
        func();
        inThrottle = setTimeout(() => (inThrottle = undefined), limit);
      }
    };
  };

  useEffect(() => {
    const handleWindowResize = throttle(() => setSize(getSize()), 0);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return size;
}

export default useScreenSize;
