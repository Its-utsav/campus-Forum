import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Footer, Header } from "./components";
import { useAuth } from "./context/User.context";
import authService from "./services/auth.services";
import { HomePageForVisiters } from "./pages";

function App() {
  const { login, logout, data } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? false;
    if (user) {
      login(user);
    } else {
      authService.getUserInfo().then((res) => {
        res ? login({ _id: res._id, username: res.username }) : logout();
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
