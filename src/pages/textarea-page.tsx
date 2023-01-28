import { useCallback, useRef, useState, ChangeEvent, useMemo } from "react";

import { Textarea } from "../shared/ui/textarea";
import { Autocomplete } from "../shared/ui/autocomplete";
import { useSuggestions } from "../shared/use-suggestions";
import { Highlight } from "../shared/ui/highlight";

export const TextareaPage = () => {
  const [value, setValue] = useState("");
  const [suggested, suggest] = useState(false);
  const selectionEndRef = useRef(0);
  const selectionEnd = selectionEndRef.current;

  const { start, end, word } = useMemo(() => {
    let start = selectionEnd - 1;
    let end = selectionEnd;

    while (start >= 0 && /\w/.test(value[start])) {
      start -= 1;
    }
    start += 1;

    while (end < value.length && /\w/.test(value[end])) {
      end += 1;
    }

    return {
      start,
      end,
      word: value.substring(start, end),
    };
  }, [value]);

  const handleChange = useCallback(
    (nextValue: string, e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(nextValue);
      suggest(true);
      selectionEndRef.current = e.target.selectionEnd;
    },
    []
  );

  const handleSelect = useCallback((suggestion: string) => {
    setValue(suggestion);
    suggest(false);
  }, []);

  const filtredSuggestions = useSuggestions(word);
  const suggestRenderCause = suggested && filtredSuggestions.length > 0;

  return (
    <div>
      <Textarea
        value={value}
        onBlur={() => suggest(false)}
        onChange={handleChange}
        suggest={
          suggestRenderCause && (
            <Autocomplete
              suggestions={filtredSuggestions}
              onSelect={handleSelect}
            >
              {({ suggestion }) => (
                <Highlight match={word}>{suggestion}</Highlight>
              )}
            </Autocomplete>
          )
        }
      />
    </div>
  );
};
