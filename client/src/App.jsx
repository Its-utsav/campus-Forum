import { useEffect } from "react";
import Header from "./components/Header";
import { useAuth } from "./context/User.context";
import Navigations from "./components/Navigations";
import authService from "./services/auth.services";

function App() {
  const { login, logout } = useAuth();
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
        <Navigations />
      </main>
    </>
  );
}

export default App;
