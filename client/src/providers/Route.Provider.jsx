import { useCallback, useEffect, useState } from "react";
import { RouterContext } from "../context/Router.context";

export const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to) => {
    history.pushState({}, "", to);
    setCurrentPath(to);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
