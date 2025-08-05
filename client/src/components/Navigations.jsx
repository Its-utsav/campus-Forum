import AboutMe from "../pages/AboutMe";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import AuthComponent from "./AuthComponent";
import Post from "./Post";
import Route from "./Route";

export default function Navigations() {
  return (
    <>
      <Route
        path="/login"
        Component={
          <AuthComponent>
            <LoginPage />
          </AuthComponent>
        }
      />
      <Route
        path="/register"
        Component={
          <AuthComponent>
            <Register />
          </AuthComponent>
        }
      />

      <Route
        path="/get-info"
        Component={
          <AuthComponent>
            <AboutMe />
          </AuthComponent>
        }
      />
      <Route
        path="/my-answer"
        Component={
          <AuthComponent>
            <h1>this is for my answer</h1>
          </AuthComponent>
        }
      />
      <Route
        path="/posts/:postID"
        Component={
          <AuthComponent>
            <Post />
          </AuthComponent>
        }
      />
      <Route
        path="/"
        Component={
          <AuthComponent>
            <Home />
          </AuthComponent>
        }
      />
    </>
  );
}
