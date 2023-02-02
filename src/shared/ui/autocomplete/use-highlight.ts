import { RefObject, useEffect, useState } from "react";
import { scrollIntoArea } from "scroll-into-area";

import { useKeyUpDown } from "./use-key-updown";

const downKeys = new Set(["Down", "ArrowDown"]);

export const useHighlight = <E extends Element>(ref: RefObject<E>) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const suggestionsEl = ref.current;
    const max = (suggestionsEl?.children.length || 1) - 1;
    setHighlightedIndex((state) => Math.max(0, Math.min(max, state)));
  });

  useKeyUpDown((e) => {
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const step = downKeys.has(e.key) ? 1 : -1;
    const suggestionsEl = ref.current;
    const max = (suggestionsEl?.children.length || 1) - 1;

    setHighlightedIndex((index) => {
      const nextIndex = index + step;
      return nextIndex < 0 ? max : nextIndex > max ? 0 : nextIndex;
    });
  });

  useEffect(() => {
    const suggestionsEl = ref.current;
    const highlightedEl = suggestionsEl?.children[highlightedIndex];

    if (!suggestionsEl || !highlightedEl || highlightedIndex < 0) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // check intersection once time and unobserve
        observer.unobserve(entry.target);

        if (entry.intersectionRatio > 0.9) {
          return;
        }

        // fix TS
        const rootBounds =
          entry.rootBounds || suggestionsEl.getBoundingClientRect();
        const isAbove = entry.boundingClientRect.y <= rootBounds.y;

        scrollIntoArea(highlightedEl, {
          container: suggestionsEl,
          y: isAbove ? "start" : "end",
          duration: 300,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      },
      {
        root: suggestionsEl,
        threshold: 1,
      }
    );

    observer.observe(highlightedEl);

    return () => {
      observer.disconnect();
    };
  }, [highlightedIndex, ref]);

  return {
    highlightedIndex,
  };
};
