import { useEffect } from "react";
import { Outlet } from "react-router";
import { Footer, Header } from "./components";
import { useAuth } from "./context/User.context";
import authService from "./services/auth.services";

function App() {
  const { login, logout, data } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? false;
    if (user) {
      login(user);
    } else {
      authService
        .getUserInfo()
        .then((res) => {
          res
            ? login({ _id: res._id, username: res.username, role: res.role })
            : logout();
        })
        .catch((reason) => {
          console.log(reason);
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
