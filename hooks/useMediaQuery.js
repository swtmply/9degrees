import { useState, useEffect } from "react";

function getMediaQuery() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useMediaQuery() {
  const [windowDimensions, setWindowDimensions] = useState(getMediaQuery());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getMediaQuery());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
