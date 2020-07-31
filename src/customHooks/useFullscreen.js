export const useFullscreen = (onFullS) => {
  const element = useRef();
  const runCb = (isFull) => {
    if (onFullS && typeof onFullS === "function") {
      onFullS(isFull);
    }
  }
  const triggerFull = () => {
    if (element.current) {
      element.current.requestFullscreen();
      runCb(true);
    }
  }
  const exitFull = () => {
    document.exitFullscreen();
    runCb(false);
  }
  return { element, triggerFull, exitFull };
};