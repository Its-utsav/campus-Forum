import Header from "./components/Header";
import Route from "./components/Route";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Route path={"/login"} Component={<LoginPage />} />
      </main>
    </>
  );
}

export default App;
