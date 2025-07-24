import { createContext, useContext } from "react";

export const RouterContext = createContext({
  path: window.location.pathname,
  navigate: () => {},
});

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Route contex not found");
  return ctx;
}
