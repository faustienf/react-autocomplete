import { ComponentProps, FC } from "react";
import "./input.css";

type Props = ComponentProps<"input">;

export const Input: FC<Props> = (props) => {
  return <input className="input" {...props} />;
};
