import { createContext, useContext } from "react";
import { useRouter } from "../context/Router.context";

/**
 *
 * @param {string} currentPath current client path eg http://localhost:8000/post/123
 * @param {string} routePath path that indicates the it has route segment (react router) path parameter eg http://localhost:8000/post/:postid
 * @returns {null | object}
 */
function matchRoutes(currentPath, routePath) {
  // both path split by / and not have any empty string ("//" -> "")
  const currentPathSegments = currentPath.split("/").filter(Boolean);
  const routePathSegments = routePath.split("/").filter(Boolean);

  if (currentPathSegments.length !== routePathSegments.length) return null;
  const params = {};

  for (let i = 0; i < routePathSegments.length; i++) {
    const currentSegment = currentPathSegments[i];
    const routeSegment = routePathSegments[i];

    if (routeSegment.startsWith(":")) {
      // :postsId -> params[postid] = currentSegment
      params[routeSegment.slice(1)] = currentSegment;
    } else if (currentSegment !== routeSegment) {
      return null;
    }
  }

  return params;
}

const ParamsContext = createContext({});
export function useParams() {
  return useContext(ParamsContext);
}

export default function Route({ path, Component }) {
  const { currentPath } = useRouter();
  const pathMatch = matchRoutes(currentPath, path);
  if (!pathMatch) return null;

  return (
    <ParamsContext.Provider value={pathMatch}>
      {Component}
    </ParamsContext.Provider>
  );
}
