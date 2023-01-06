import {
  ComponentProps,
  MouseEvent,
  ReactNode,
  useRef,
  RefObject,
  ReactElement,
  memo,
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

type Props<S> = Omit<ComponentProps<"ul">, "children" | "onSelect"> & {
  suggestions: S[];
  onSelect: (suggestion: S, index: number) => void;
  children: (props: ChildProps<S>) => ReactNode;
};

const preventScroll = (e: MouseEvent<HTMLUListElement>) => {
  e.preventDefault();
};

export const Autocomplete = memo(function Autocomplete<S>(props: Props<S>) {
  const { children, suggestions, onSelect, ...rest } = props;

  const ref = useRef<HTMLUListElement>(null);
  const { highlightedIndex } = useHighlight(ref);

  useKeyEnter(() => {
    onSelect(suggestions[highlightedIndex], highlightedIndex);
  });

  return (
    <ul ref={ref} className="autocomplete" onScroll={preventScroll} {...rest}>
      {suggestions.map((suggestion, index) =>
        children({
          suggestion,
          index,
          highlightedIndex,
          highlighted: highlightedIndex === index,
        })
      )}
    </ul>
  );
}) as <S>(props: Props<S>) => ReactElement;
