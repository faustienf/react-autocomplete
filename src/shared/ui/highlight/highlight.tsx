import { memo } from "react";

import "./highlight.css";

type Props = {
  match: string;
  children: string;
};

export const Highlight = memo<Props>(function Highlight({ match, children }) {
  const index = children.toLocaleLowerCase().indexOf(match.toLocaleLowerCase());
  const start = children.substring(0, index);
  const middle = children.substring(index, index + match.length);
  const end = children.substring(index + match.length);

  return (
    <>
      {start}
      <span className="highlight">{middle}</span>
      {end}
    </>
  );
});
