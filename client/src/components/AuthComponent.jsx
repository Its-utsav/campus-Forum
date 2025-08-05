import { useRouter } from "../context/Router.context";
import { useAuth } from "../context/User.context";

export default function AuthComponent(props) {
  const { children } = props;
  const { navigate, currentPath } = useRouter();
  const { data } = useAuth();
  // const userData = JSON.parse(localStorage.getItem("userData")) ?? false;

  // useEffect(() => {
  const isAuthenticate = data;

  // console.log(isAuthenticate, path);
  if (
    !isAuthenticate &&
    currentPath !== "/login" &&
    currentPath !== "/register"
  ) {
    // console.log("go to login");
    navigate("/login");
    return null;
  }
  if (
    isAuthenticate &&
    (currentPath === "/login" || currentPath === "/register")
  ) {
    // console.log("go to home");
    navigate("/");
    return null;
  }
  // }, [data, currentPath, navigate]);

  return children;
}
