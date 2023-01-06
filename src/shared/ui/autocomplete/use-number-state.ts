import { useEffect, useState } from "react";
import useEvent from "react-use-event-hook";

type Options = {
  min: number;
  max: number;
};

const limit = (target: number) => {
  return {
    range: (min: number, max: number) => Math.max(min, Math.min(max, target)),
  };
};

export const useNumberState = (
  initialNumber: number,
  {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  }: Partial<Options> = {}
) => {
  const [state, setState] = useState(initialNumber);

  const setLimitedState = useEvent<typeof setState>((stateOrAction) => {
    if (typeof stateOrAction === "function") {
      setState((currentState) => {
        const nextState = stateOrAction(currentState);
        return limit(nextState).range(min, max);
      });
    } else {
      setState(limit(stateOrAction).range(min, max));
    }
  });

  useEffect(() => {
    setState((state) => limit(state).range(min, max));
  }, [min, max]);

  return [state, setLimitedState] as const;
};
