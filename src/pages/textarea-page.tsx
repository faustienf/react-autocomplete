import { useRef, useState, ChangeEvent, useMemo, useLayoutEffect } from "react";
import useEvent from "react-use-event-hook";

import { Textarea } from "../shared/ui/textarea";
import { Autocomplete } from "../shared/ui/autocomplete";
import { useSuggestions } from "../shared/use-suggestions";
import { Highlight } from "../shared/ui/highlight";
import { insertString } from "../shared/lib/insert-string";
import { selectWord } from "../shared/lib/select-word";

export const TextareaPage = () => {
  const [value, setValue] = useState("");
  const [suggested, suggest] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const selectionEndRef = useRef(0);

  const { startIndex, endIndex, word } = useMemo(
    () => selectWord(value, selectionEndRef.current),
    [value]
  );

  const handleChange = useEvent(
    (nextValue: string, e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(nextValue);
      suggest(true);
      selectionEndRef.current = e.target.selectionEnd;
    }
  );

  const handleSelect = useEvent((suggestion: string) => {
    const nextValue = insertString(value, suggestion, [startIndex, endIndex]);
    setValue(nextValue);
    suggest(false);
  });

  const handleBlur = useEvent(() => suggest(false));

  useLayoutEffect(() => {
    const textareaEl = ref.current;
    if (!textareaEl) {
      return;
    }

    textareaEl.setSelectionRange(endIndex, endIndex);
  }, [endIndex]);

  const filtredSuggestions = useSuggestions(word);
  const suggestRenderCause = suggested && filtredSuggestions.length > 0;

  return (
    <div>
      <blockquote>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </blockquote>
      <Textarea
        ref={ref}
        value={value}
        placeholder="Enter the text above 👆"
        onBlur={handleBlur}
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
