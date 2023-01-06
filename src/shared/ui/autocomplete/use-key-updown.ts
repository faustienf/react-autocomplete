import { useEffect } from "react";
import useEvent from "react-use-event-hook";

const arrowKeys = new Set(["Down", "Up", "ArrowDown", "ArrowUp"]);

export const useKeyUpDown = (callback: (e: KeyboardEvent) => void) => {
  const cb = useEvent(callback);

  useEffect(() => {
    const handle = (e: KeyboardEvent): void => {
      if (arrowKeys.has(e.key)) {
        cb(e);
      }
    };

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [cb]);
};
