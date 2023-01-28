import React, {
  ComponentProps,
  ReactNode,
  useRef,
  ReactElement,
  memo,
  useCallback,
} from "react";

import { useKeyEnter } from "./use-key-enter";
import { useHighlight } from "./use-highlight";
import "./autocomplete.css";

type ChildProps<S> = {
  suggestion: S;
  index: number;
  highlightedIndex: number;
  highlighted: boolean;
};

type Props<S> = Omit<ComponentProps<"div">, "children" | "onSelect"> & {
  suggestions: S[];
  onSelect: (suggestion: S, index: number) => void;
  children: (props: ChildProps<S>) => ReactNode;
};

const preventEvent = (e: React.UIEvent<HTMLElement, UIEvent>) => {
  e.preventDefault();
};

export const Autocomplete = memo(function Autocomplete<S>(props: Props<S>) {
  const { children, suggestions, onSelect, ...rest } = props;

  const ref = useRef<HTMLDivElement>(null);
  const { highlightedIndex } = useHighlight(ref);

  useKeyEnter((e) => {
    e.preventDefault();
    onSelect(suggestions[highlightedIndex], highlightedIndex);
  });

  return (
    <div
      ref={ref}
      className="autocomplete"
      onScroll={preventEvent}
      onPointerDown={preventEvent}
      {...rest}
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          type="button"
          className="autocomplete-suggestion"
          data-highlighted={highlightedIndex === index}
          onClick={() => onSelect(suggestion, index)}
        >
          {children({
            suggestion,
            index,
            highlightedIndex,
            highlighted: highlightedIndex === index,
          })}
        </button>
      ))}
    </div>
  );
}) as <S>(props: Props<S>) => ReactElement;
