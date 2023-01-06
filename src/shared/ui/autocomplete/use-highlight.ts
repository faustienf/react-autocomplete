import { RefObject, useEffect, useState } from "react";
import { scrollIntoArea } from "scroll-into-area";

import { useKeyUpDown } from "./use-key-updown";
import { useNumberState } from "./use-number-state";

const downKeys = new Set(["Down", "ArrowDown"]);
const limit = (target: number) => {
  return {
    range: (min: number, max: number) => Math.max(min, Math.min(max, target)),
  };
};

export const useHighlight = <E extends Element>(ref: RefObject<E>) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const suggestionsEl = ref.current;
    const max = suggestionsEl?.children.length || 0;
    setHighlightedIndex((state) => limit(state).range(0, max));
  }, []);

  useKeyUpDown((e) => {
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const step = downKeys.has(e.key) ? 1 : -1;
    const suggestionsEl = ref.current;
    const max = suggestionsEl?.children.length || 0;

    setHighlightedIndex((index) => limit(index + step).range(0, max));
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
