import { useMemo } from "react";

const suggestions = [
  ...new Set(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`.split(
      " "
    )
  ),
];

export const useSuggestions = (value: string): string[] => {
  const valueLC = value.toLocaleLowerCase();
  return useMemo(() => {
    return valueLC
      ? suggestions.filter((suggestion) =>
          suggestion.toLocaleLowerCase().includes(valueLC)
        )
      : [];
  }, [valueLC]);
};
