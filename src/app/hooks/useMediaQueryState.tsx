import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TailwindBreakpoints from "tailwindcss/defaultTheme";

export const DefaultBreakpoints = TailwindBreakpoints.screens;

const useMediaQueryState = ({
  query,
  breakpoint,
}: {
  query?: string;
  breakpoint?: string;
}) => {
  const [queryState, setQueryState] = useState(false);

  const isMatch = useMediaQuery({
    query: query || `(min-width:${breakpoint})`,
  });

  useEffect(() => {
    setQueryState(isMatch);
  }, [isMatch]);

  return queryState;
};

export default useMediaQueryState;
