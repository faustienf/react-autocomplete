import { useEffect } from "react";
import useEvent from "react-use-event-hook";

export const useKeyEsc = (callback: (e: KeyboardEvent) => void) => {
  const cb = useEvent(callback);

  useEffect(() => {
    const handle = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        cb(e);
      }
    };

    window.addEventListener("keydown", handle);
    return () => {
      window.removeEventListener("keydown", handle);
    };
  }, [cb]);
};
