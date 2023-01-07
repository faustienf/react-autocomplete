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

type Props<S, T extends keyof JSX.IntrinsicElements> = Omit<
  ComponentProps<T>,
  "children" | "onSelect"
> & {
  as?: T;
  suggestions: S[];
  onSelect: (suggestion: S, index: number) => void;
  children: (props: ChildProps<S>) => ReactNode;
};

export const Autocomplete = memo(function Autocomplete<S>(
  props: Props<S, "ul">
) {
  const { as: As = "ul", children, suggestions, onSelect, ...rest } = props;
  const ref = useRef<HTMLUListElement>(null);
  const { highlightedIndex } = useHighlight(ref);

  useKeyEnter(() => {
    onSelect(suggestions[highlightedIndex], highlightedIndex);
  });

  const preventEvent = useCallback((e: React.UIEvent<HTMLElement, UIEvent>) => {
    e.preventDefault();
  }, []);

  return (
    <As
      ref={ref}
      className="autocomplete"
      onScroll={preventEvent}
      onPointerDown={preventEvent}
      {...rest}
    >
      {suggestions.map((suggestion, index) =>
        children({
          suggestion,
          index,
          highlightedIndex,
          highlighted: highlightedIndex === index,
        })
      )}
    </As>
  );
}) as <S, T extends keyof JSX.IntrinsicElements>(
  props: Props<S, T>
) => ReactElement;
