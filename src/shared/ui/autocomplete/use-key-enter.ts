import { useEffect } from "react";
import useEvent from "react-use-event-hook";

export const useKeyEnter = (callback: (e: KeyboardEvent) => void) => {
  const cb = useEvent(callback);

  useEffect(() => {
    const handle = (e: KeyboardEvent): void => {
      if (e.key === "Enter") {
        cb(e);
      }
    };

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [cb]);
};
