import { useCallback, useMemo, useState } from "react";

import { Input } from "../../shared/ui/input";
import { Autocomplete } from "../../shared/ui/autocomplete";

const suggestions = [
  ...new Set(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`.split(
      " "
    )
  ),
];
export const InputPage = () => {
  const [value, setValue] = useState("");
  const [suggested, suggest] = useState(false);

  const handleChange = useCallback((nextValue: string) => {
    setValue(nextValue);
    suggest(true);
  }, []);

  const handleSelect = useCallback((nextValue: string) => {
    setValue(nextValue);
    suggest(false);
  }, []);

  const simplifiedValue = value.toLocaleLowerCase();
  const filtredSuggestions = useMemo(() => {
    return simplifiedValue
      ? suggestions.filter((suggestion) =>
          suggestion.toLocaleLowerCase().includes(simplifiedValue)
        )
      : [simplifiedValue];
  }, [simplifiedValue]);

  return (
    <div style={{ position: "relative" }}>
      <Input
        value={value}
        onBlur={() => suggest(false)}
        onChange={(e) => handleChange(e.target.value)}
      />
      {suggested && filtredSuggestions.length > 0 && (
        <Autocomplete suggestions={filtredSuggestions} onSelect={handleSelect}>
          {({ suggestion, index, highlighted }) => (
            <li key={index} onClick={() => handleSelect(suggestion)}>
              {highlighted ? <strong>{suggestion}</strong> : suggestion}
            </li>
          )}
        </Autocomplete>
      )}
    </div>
  );
};
