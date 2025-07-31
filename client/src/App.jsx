import { useEffect } from "react";
import Header from "./components/Header";
import Route from "./components/Route";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/User.context";
import authService from "./services/auth.services";

const Navigations = () => (
  <>
    <Route path="/login" Component={<LoginPage />} />
    <Route path="/register" Component={<Register />} />
  </>
);

function App() {
  const { login, logout } = useAuth();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) ?? false;
    console.log(user);
    if (!user) {
      login(user);
    } else {
      authService.getUserInfo().then((res) => {
        res ? login(res) : logout();
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
