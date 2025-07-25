import Header from "./components/Header";
import Route from "./components/Route";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";

const Navigations = () => (
  <>
    <Route path="/login" Component={<LoginPage />} />
    <Route path="/register" Component={<Register />} />
  </>
);

function App() {
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
