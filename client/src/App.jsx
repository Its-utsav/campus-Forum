import Header from "./components/Header";
import Route from "./components/Route";
import LoginPage from "./pages/Login";

const Navigations = () => (
  <>
    <Route path="/login" Component={<LoginPage />} />
  </>
);

function App() {
  return (
    <>
      <Header />
      <main className="container"></main>

      <Navigations></Navigations>
    </>
  );
}

export default App;
