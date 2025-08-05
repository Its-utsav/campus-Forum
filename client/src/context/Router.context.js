import { createContext, useContext } from "react";

export const RouterContext = createContext({
  currentPath: window.location.pathname, // store the current path
  navigate: () => {}, // for navigation
});

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("Route contex not found");
  return ctx;
}
