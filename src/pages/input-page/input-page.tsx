import { useState } from "react";

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
  const [focused, setFocus] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Input
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setValue(e.target.value)}
      />
      {focused && (
        <Autocomplete suggestions={suggestions} onSelect={setValue}>
          {({ suggestion, index, highlighted }) => (
            <li key={index}>
              {highlighted ? <strong>{suggestion}</strong> : suggestion}
            </li>
          )}
        </Autocomplete>
      )}
    </div>
  );
};
