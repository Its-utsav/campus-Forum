import { useRouter } from "../context/Router.context";

export default function Route({ path, Component }) {
  const { path: currentPath } = useRouter();

  return currentPath === path ? Component : null;
}
