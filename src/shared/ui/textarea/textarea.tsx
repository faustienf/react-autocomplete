import {
  ChangeEvent,
  memo,
  ReactNode,
  TextareaHTMLAttributes,
  useRef,
} from "react";
import "./textarea.css";

type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange"
>;
type Props = TextareaProps & {
  value?: string;
  suggest?: ReactNode;
  onChange?: (
    nextValue: string,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export const Textarea = memo<Props>(function Textarea(props) {
  const { value = "", suggest, onChange, ...rest } = props;

  const selectionEndRef = useRef(0);
  const selectionEnd = selectionEndRef.current;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    selectionEndRef.current = event.target.selectionEnd;

    if (onChange) {
      onChange(event.target.value, event);
    }
  };

  const start = value.substring(0, selectionEnd);
  const end = value.substring(selectionEnd);

  return (
    <div className="textarea">
      <div className="textarea-target" data-view="hidden">
        {start}
        <span className="textarea-suggest">{suggest}</span>
        {end} <br />
      </div>
      <textarea
        {...rest}
        value={value}
        className="textarea-target"
        data-view="native"
        onChange={handleChange}
      />
    </div>
  );
});
